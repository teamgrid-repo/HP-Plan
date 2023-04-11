import CustomButton from "../UI/CustomButton";
import { GpsFixed, HelpOutline, Search } from "@mui/icons-material";
import {
  Card,
  Checkbox,
  Grid,
  TextField,
  Select,
  MenuItem,
  Slider,
  Chip,
  ListSubheader,
  ListItemText,
  Divider,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import { BasicSwitch } from "../UI/CustomSwitch";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProviderSarch,
  setDistace,
  shareF,
  setAdditional,
  changeDistace,
} from "../../redux/actions/ProviderSearch/ProviderSearchAction";
import { bindActionCreators } from "redux";
import debounce from "lodash.debounce";
import UsStates from "../../utils/UsStates";
import { useLocation } from "react-router-dom";
import LeafIcon from "../../assets/icons/leaf.png";
import axios from "axios";
import CustomAutoComp from "../GooglePlaceAuto/CustomAutoComp";
import _ from "underscore";
import { locFromAdd } from "../../utils/locFromAdd";
import { set } from "lodash";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
const selectProps = {
  sx: {
    maxHeight: "400px",
    marginLeft: "5px",
  },
  anchorOrigin: {
    vertical: "top",
    horizontal: "right",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
};
const selectSx = { marginTop: "10px" };
const priceListData = [
  { value: "Free", label: "Free" },
  {
    value: "Discounted,Negotiable-rates",
    label: "Discounted/Negotiable rates",
  },
  { value: "Market", label: "Market" },
  { value: "Sliding-fee-scale", label: "Sliding-fee-scale" },
  { value: "Medicaid", label: "Medicaid" },
];

const suggestions = [
  {
    name: "Support services for women",
    sug: ["Family and parenting education"],
  },
  {
    name: "General health services",
    sug: ["Children’s healthcare"],
  },
  {
    name: "Financial assistance",
    sug: ["Legal support", "Pregnancy and infant loss support"],
  },
  {
    name: "Education opportunities",
    sug: ["Family and parenting education"],
  },

  {
    name: "Food and nutrition",
    sug: ["Financial assistance"],
  },
  {
    name: "Housing, shelters, and maternity homes",
    sug: ["Financial assistance"],
  },
  {
    name: "Perinatal hospice resources",
    sug: ["Pregnancy and infant loss support"],
  },
  {
    name: "Disability Support Organizations",
    sug: ["Adoption services"],
  },
  {
    name: "Childcare Help",
    sug: ["Support services for women"],
  },
  {
    name: "Family and parenting education",
    sug: ["Support services for women", "Education opportunities"],
  },
];

const containsText = (text, searchText) => {
  return (
    text?.toString()?.toLowerCase().indexOf(searchText?.toLowerCase()) > -1
  );
};

const geocoder = new window.google.maps.Geocoder();
const FilterCard = ({ classes }) => {
  const parms = useLocation();
  const dispatch = useDispatch();
  const action = bindActionCreators(
    { getProviderSarch, setDistace, shareF, setAdditional, changeDistace },
    dispatch
  );
  const [sug, setSug] = useState([]);
  const [cat, setCat] = useState([]);
  const [specification, setSpacification] = useState([]);
  const [catOpen, setCatOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [specialQOpen, setSpecialQOpen] = useState(false);
  const [leafApp, setLeafApp] = useState(true);
  const [prevent, setPrevent] = useState(true);
  const [address, setAddress] = useState("");
  const [filter, setFilter] = useState({
    subcategory: [],
    selCat: [{ label: "de", value: "de", name: "Please Select Care" }],
    selPrice: ["Please Select Price"],
    selQue: [
      { label: "de", value: "de", name: "Please Select Qualifications" },
    ],
    selQuesId: [],
    leaf: false,
  });
  const [des, setDes] = useState(1);
  const [ct, setCt] = useState();
  const [searchString, setSearchString] = useState("");
  const [stateF, setStateF] = useState({
    selState: [{ label: "de", value: "de", name: "Please Select State" }],
    selStateId: [],
  });
  const [callData, setCallData] = useState(false);
  const [customLocData, setCustomLodData] = useState({
    currLoc: false,
    address: "",
  });
  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
    () => UsStates.filter((option) => containsText(option.name, searchText)),
    [searchText]
  );
  const inputRef = useRef(undefined);

  const generateCt = async (data) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    await setCt(() => source);
    await setCallData(() => data);
  };
  const changeCustLocFlag = (f) => {
    if (f) {
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          let lat = position.coords.latitude;
          let long = position.coords.longitude;
          // let lat = 39.1492746;
          // let long = -76.7752493;
          const data = { lat: lat, lang: long };

          action.changeDistace(data);
          const add = await geocoder.geocode({ location: { lng: long, lat } });
          if (add && add.results[0] && add.results[0].formatted_address) {
            setAddress(() => add.results[0].formatted_address);
            const data = {
              category: filter.subcategory.filter(
                (s) => s !== null && s !== undefined
              ),
              price: filter.selPrice.filter((_, idx) => idx !== 0),
              leaf: filter.leaf,
              specialQualification: filter.selQuesId.filter(
                (s) => s !== null && s !== undefined
              ),
              address: add.results[0].formatted_address,
              additionalResource: addRes,
              keywords: searchString,
              states: stateF.selStateId.filter((_, id) => id > 0),
              locFilter: locFilter,
              customLocData: { currLoc: f, address: "", location: "" },
              des: des,
            };
            action.shareF(data);
            localStorage.setItem("localFilterData", JSON.stringify(data));
            localStorage.setItem("zoom", 8);
            //callProviderSearch(data);
          }
        },
        () => {
          setAddress(() => "");
          action.changeDistace("");
          const data = {
            category: filter.subcategory.filter(
              (s) => s !== null && s !== undefined
            ),
            price: filter.selPrice.filter((_, idx) => idx !== 0),
            leaf: filter.leaf,
            specialQualification: filter.selQuesId.filter(
              (s) => s !== null && s !== undefined
            ),
            address: "",
            additionalResource: addRes,
            keywords: searchString,
            states: stateF.selStateId.filter((_, id) => id > 0),
            locFilter: locFilter,
            customLocData: { currLoc: f, address: "", location: "" },
            des: des,
          };

          action.shareF(data);
          localStorage.setItem("localFilterData", JSON.stringify(data));
          // callProviderSearch(data);
        },
        options
      );
    } else {
      action.changeDistace("");
    }
    setCustomLodData(() => {
      return { currLoc: f, address: "" };
    });
  };
  const selAutoComplete = (loc) => {
    if (loc && loc.location && loc.location.lat && loc.location.lang) {
      setCustomLodData((old) => {
        return { ...old, address: loc.address, location: loc.location };
      });
      setAddress(() => loc.address);
      const data = {
        category: filter.subcategory.filter(
          (s) => s !== null && s !== undefined
        ),
        price: filter.selPrice.filter((_, idx) => idx !== 0),
        leaf: filter.leaf,
        specialQualification: filter.selQuesId.filter(
          (s) => s !== null && s !== undefined
        ),
        address: loc.address,
        additionalResource: addRes,
        keywords: searchString,
        states: stateF.selStateId.filter((_, id) => id > 0),
        locFilter: locFilter,
        customLocData: { address: loc.address, location: loc.location },
        des: des,
      };
      action.shareF(data);
      localStorage.setItem("localFilterData", JSON.stringify(data));
      localStorage.setItem("zoom", 9);
      action.changeDistace(loc.location);
    }
  };
  useEffect(() => {
    if (ct && callData) {
      action.getProviderSarch(callData, ct.token);
      setCallData(() => false);
    }
  }, [ct, callData]);
  const callProviderSearch = async (data) => {
    if (ct) {
      ct.cancel();
    }
    await generateCt(data);
  };

  const [locFilter, setLocFilter] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);

  const [stateOpen, setSatetOpen] = useState(false);

  const catRes = useSelector((state) => state.cat.cats);
  const spaceRes = useSelector((state) => state.cat.space);
  const addRes = useSelector((state) => state.admin.addtionalRes, _.isEqual);

  useEffect(() => {
    if (addRes) {
      locFromAdd("filter-additional");
    } else {
      locFromAdd("filter-general");
    }
  }, [addRes]);
  const providerSearchRes = useSelector((state) => state.cat.ps);

  const debouncedSave = useCallback(
    debounce(
      (debo, val, fi, st, re, locFilterA, customLocDataA, desA, addressA) =>
        handleSearch(
          debo,
          val,
          fi,
          st,
          re,
          locFilterA,
          customLocDataA,
          desA,
          addressA
        ),
      1000
    ),
    []
  );

  const debounDistace = useCallback(
    debounce((a) => action.setDistace(a), 1000),
    []
  );

  const findViaString = (s) => {
    setSearchString(s);
    debouncedSave(
      true,
      s,
      filter,
      stateF,
      addRes,
      locFilter,
      customLocData,
      des,
      address
    );
  };
  const loadDistace = (a) => {
    setDes(() => a);
    debounDistace(a);
    const data = {
      category: filter.subcategory.filter((s) => s !== null && s !== undefined),
      price: filter.selPrice.filter((_, idx) => idx !== 0),
      leaf: filter.leaf,
      specialQualification: filter.selQuesId.filter(
        (s) => s !== null && s !== undefined
      ),
      additionalResource: addRes,
      keywords: searchString,
      states: stateF.selStateId.filter((_, id) => id > 0),
      locFilter: locFilter,
      customLocData: customLocData,
      des: a,
      address: address,
    };
    action.shareF(data);
    localStorage.setItem("localFilterData", JSON.stringify(data));
  };
  const setCategory = async () => {
    if (catRes && catRes.length) {
      const catData = [];
      for (let i = 0; i < catRes.length; i++) {
        //category //subCategory
        catData.push(
          {
            ...catRes[i].category,
            cat: true,
          },
          ...Object.values(catRes[i].subCategory).map((e) => {
            return { ...e, cat: false };
          })
        );
      }
      setCat(() => catData);
    }
  };
  useEffect(() => {
    setCategory();
  }, [catRes]);
  const loadFromUrl = async () => {
    try {
      if (
        parms &&
        parms.search &&
        parms.search.split("?")[1] &&
        decodeURI(parms.search.split("?")[1]) &&
        JSON.parse(decodeURI(parms.search.split("?")[1])) &&
        Object.keys(JSON.parse(decodeURI(parms.search.split("?")[1]))).length
      ) {
        const data = await JSON.parse(decodeURI(parms.search.split("?")[1]));
        await action.shareF(data);

        await callProviderSearch(data);
        localStorage.setItem("localFilterData", JSON.stringify(data));

        const catData = [];
        for (let i = 0; i < catRes.length; i++) {
          //category //subCategory
          catData.push(
            {
              ...catRes[i].category,
              cat: true,
            },
            ...Object.values(catRes[i].subCategory).map((e) => {
              return { ...e, cat: false };
            })
          );
        }
        const cd = {
          subcategory: [],
          selCat: [{ label: "de", value: "de", name: "Please Select Care" }],
          selPrice: ["Please Select Price"],
          selQue: [{ label: "de", value: "de", name: "Please Select Care" }],
          selQuesId: [],
          leaf: false,
        };
        cd.leaf = data.leaf;
        if (data.category) {
          cd.subcategory.push(...data.category);
        }
        if (data.price) {
          cd.selPrice.push(...data.price);
        }
        const sr = [];

        if (cd.subcategory && cd.subcategory.length) {
          spaceRes.forEach((s) => {
            if (cd.subcategory.find((i) => i === s._id)) {
              sr.push(
                { subCat: true, _id: s._id, name: s.name },
                ...Object.values(s.specialQualification).map((e) => {
                  return { ...e, subCat: false };
                })
              );
            }
          });
        } else {
          for (let i = 0; i < spaceRes.length; i++) {
            sr.push(
              { subCat: true, _id: spaceRes[i]._id, name: spaceRes[i].name },
              ...Object.values(spaceRes[i].specialQualification).map((e) => {
                return { ...e, subCat: false };
              })
            );
          }
        }
        if (data.specialQualification) {
          for (let j = 0; j < data.specialQualification.length; j++) {
            sr.forEach((s) => {
              if (data.specialQualification.find((i) => i && i === s._id)) {
                cd.selQue.push(s);
                cd.selQuesId.push(s._id);
              }
            });
          }
        }
        if (data.category) {
          for (let i = 0; i < data.category.length; i++) {
            let citem = catData.find(
              (c) => c.cat === false && c._id === data.category[i]
            );
            if (citem) cd.selCat.push(citem);
          }
        }
        const sugMake = [];

        if (cd.selCat && cd.selCat.length) {
          cd.selCat.forEach((d) => {
            if (d && d.name) {
              suggestions.forEach((sg) => {
                if (
                  d.name.toLocaleLowerCase() === sg.name.toLocaleLowerCase()
                ) {
                  sugMake.push(...sg.sug);
                }
              });
            }
          });
        }

        const leafA =
          cd.selCat && cd.selCat.length > 1
            ? cd.selCat.find((d) => d && d.applicable)
            : true;
        const sd = {
          selState: [{ label: "de", value: "de", name: "Please Select State" }],
          selStateId: ["de"],
        };
        if (data.states) {
          sd.selStateId.push(...data.states);
          for (let k = 0; k < data.states.length; k++) {
            sd.selState.push(UsStates.find((i) => i.value === data.states[k]));
          }
        }
        if (data.customLocData) {
          setCustomLodData(() => data.customLocData);
        }
        if (data.des) {
          setDes(() => data.des);
        }
        setLocFilter(() => data.locFilter || false);

        action.setAdditional(data.additionalResource);
        setLeafApp(() => (leafA ? true : false));
        setSpacification(() => sr);
        setSug(sugMake);
        setCat(() => catData);
        setStateF(() => sd);
        setSearchString(data.keywords);
        setFilter(() => cd);
      }
    } catch (error) {}
  };
  const [alreadyLoaded, setAlreadyLoaded] = useState(false);
  useEffect(() => {
    if (providerSearchRes && !alreadyLoaded) {
      if (customLocData.currLoc) {
        changeCustLocFlag(true);
      } else {
        selAutoComplete(customLocData);
      }
      action.setDistace(des);
      setAlreadyLoaded(() => true);
    }
  }, [providerSearchRes]);

  useEffect(() => {
    if (spaceRes && spaceRes.length) {
      const sr = [];
      for (let i = 0; i < spaceRes.length; i++) {
        sr.push(
          { subCat: true, _id: spaceRes[i]._id, name: spaceRes[i].name },
          ...Object.values(spaceRes[i].specialQualification).map((e) => {
            return { ...e, subCat: false };
          })
        );
      }
      setSpacification(() => sr);
      setFirstLoad(true);
    }
  }, [spaceRes]);

  const loadFromStorage = async () => {
    try {
      if (localStorage.getItem("localFilterData")) {
        const data = await JSON.parse(localStorage.getItem("localFilterData"));
        await action.shareF(data);
        localStorage.setItem("localFilterData", JSON.stringify(data));
        if (!providerSearchRes) {
          callProviderSearch(data);
        }
        const catData = [];
        for (let i = 0; i < catRes.length; i++) {
          //category //subCategory
          catData.push(
            {
              ...catRes[i].category,
              cat: true,
            },
            ...Object.values(catRes[i].subCategory).map((e) => {
              return { ...e, cat: false };
            })
          );
        }
        const cd = {
          subcategory: [],
          selCat: [{ label: "de", value: "de", name: "Please Select Care" }],
          selPrice: ["Please Select Price"],
          selQue: [{ label: "de", value: "de", name: "Please Select Care" }],
          selQuesId: [],
          leaf: false,
        };
        cd.leaf = data.leaf;
        if (data.category) {
          cd.subcategory.push(...data.category);
        }
        if (data.price) {
          cd.selPrice.push(...data.price);
        }
        const sr = [];

        if (cd.subcategory && cd.subcategory.length) {
          spaceRes.forEach((s) => {
            if (cd.subcategory.find((i) => i === s._id)) {
              sr.push(
                { subCat: true, _id: s._id, name: s.name },
                ...Object.values(s.specialQualification).map((e) => {
                  return { ...e, subCat: false };
                })
              );
            }
          });
        } else {
          for (let i = 0; i < spaceRes.length; i++) {
            sr.push(
              { subCat: true, _id: spaceRes[i]._id, name: spaceRes[i].name },
              ...Object.values(spaceRes[i].specialQualification).map((e) => {
                return { ...e, subCat: false };
              })
            );
          }
        }
        if (data.specialQualification) {
          for (let j = 0; j < data.specialQualification.length; j++) {
            sr.forEach((s) => {
              if (data.specialQualification.find((i) => i && i === s._id)) {
                cd.selQue.push(s);
                cd.selQuesId.push(s._id);
              }
            });
          }
        }
        if (data.category) {
          for (let i = 0; i < data.category.length; i++) {
            let citem = catData.find(
              (c) => c.cat === false && c._id === data.category[i]
            );
            if (citem) cd.selCat.push(citem);
          }
        }
        const sugMake = [];

        if (cd.selCat && cd.selCat.length) {
          cd.selCat.forEach((d) => {
            if (d && d.name) {
              suggestions.forEach((sg) => {
                if (
                  d.name.toLocaleLowerCase() === sg.name.toLocaleLowerCase()
                ) {
                  sugMake.push(...sg.sug);
                }
              });
            }
          });
        }

        const leafA =
          cd.selCat && cd.selCat.length > 1
            ? cd.selCat.find((d) => d && d.applicable)
            : true;
        const sd = {
          selState: [{ label: "de", value: "de", name: "Please Select State" }],
          selStateId: ["de"],
        };
        if (data.states) {
          sd.selStateId.push(...data.states);
          for (let k = 0; k < data.states.length; k++) {
            sd.selState.push(UsStates.find((i) => i.value === data.states[k]));
          }
        }

        if (data.customLocData) {
          setCustomLodData(() => data.customLocData);
        }
        if (data.des) {
          setDes(() => data.des);
        }
        setLocFilter(() => data.locFilter || false);
        action.setAdditional(data.additionalResource);
        setLeafApp(() => (leafA ? true : false));
        setSpacification(() => sr);
        setSug(sugMake);
        setCat(() => catData);
        setStateF(() => sd);
        setSearchString(data.keywords);
        setFilter(() => cd);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    if (
      parms.search.split("?")[1] &&
      spaceRes &&
      spaceRes.length &&
      catRes &&
      catRes.length
    ) {
      loadFromUrl();
    } else if (
      localStorage.getItem("localFilterData") &&
      spaceRes &&
      spaceRes.length &&
      catRes &&
      catRes.length
    ) {
      loadFromStorage();
    } else if (!localStorage.getItem("localFilterData")) {
      if (!providerSearchRes) {
        callProviderSearch({});
      }
    }
  }, [spaceRes, catRes]);

  const selCat = (data) => {
    const newLoc = { ...filter };
    if (data) {
      const subIds = [];
      data.forEach((c) => {
        if (c && c._id) {
          subIds.push(c._id);
        }
      });
      const sr = [];
      const leafA = data.find((d) => d && d.applicable);
      setLeafApp(() => (leafA || data.length <= 1 ? true : false));
      if (!leafA && data.length > 1) {
        newLoc["leaf"] = false;
      }
      const selQue = [{ label: "de", value: "de", name: "Please Select Care" }];
      const selQuesId = [];

      if (subIds && subIds.length) {
        spaceRes.forEach((s) => {
          if (subIds.find((i) => i === s._id)) {
            sr.push(
              { subCat: true, _id: s._id, name: s.name },
              ...Object.values(s.specialQualification).map((e) => {
                return { ...e, subCat: false };
              })
            );
          }
        });
        sr.forEach((s) => {
          if (newLoc.selQuesId.find((i) => i && i === s._id)) {
            selQue.push(s);
            selQuesId.push(s._id);
          }
        });
      } else {
        for (let i = 0; i < spaceRes.length; i++) {
          sr.push(
            { subCat: true, _id: spaceRes[i]._id, name: spaceRes[i].name },
            ...Object.values(spaceRes[i].specialQualification).map((e) => {
              return { ...e, subCat: false };
            })
          );
        }
      }

      const sugMake = [];
      data.forEach((d) => {
        if (d && d.name) {
          suggestions.forEach((sg) => {
            if (d.name.toLocaleLowerCase() === sg.name.toLocaleLowerCase()) {
              sugMake.push(...sg.sug);
            }
          });
        }
      });
      setSug(sugMake);
      newLoc["subcategory"] = [...new Set(subIds)];
      newLoc["selCat"] = data.filter(function (element) {
        return element !== undefined;
      });

      newLoc["selQuesId"] = selQuesId;
      newLoc["selQue"] = selQue;

      setSpacification(() => sr);
      setFilter(() => newLoc);
    } else {
      const sr = [];
      for (let i = 0; i < spaceRes.length; i++) {
        sr.push(
          { subCat: true, _id: spaceRes[i]._id, name: spaceRes[i].name },
          ...Object.values(spaceRes[i].specialQualification).map((e) => {
            return { ...e, subCat: false };
          })
        );
      }
      newLoc["subcategory"] = [
        { label: "de", value: "de", name: "Please Select Care" },
      ];
      newLoc["selCat"] = [];

      newLoc["selQuesId"] = [];
      newLoc["selQue"] = [
        { label: "de", value: "de", name: "Please Select Care" },
      ];
      setSpacification(() => sr);
      setFilter(() => newLoc);
    }
  };
  const handleSelectOpen = async (t) => {
    await setPrevent(() => false);
    switch (t) {
      case "cat":
        await setCatOpen(() => false);
        break;
      case "price":
        await setPriceOpen(() => false);
        break;
      case "spec":
        await setSpecialQOpen(() => false);
        break;
      case "state":
        setSearchText("");

        await setSatetOpen(() => false);
      default:
        break;
    }
    await handleSearch();
    await setPrevent(() => true);
  };
  const handleSelectclose = async (t) => {
    if (prevent) {
      await setPrevent(() => false);
      switch (t) {
        case "cat":
          await setCatOpen(() => true);
          break;
        case "price":
          await setPriceOpen(() => true);
          break;
        case "spec":
          await setSpecialQOpen(() => true);
          break;
        case "state":
          await setSatetOpen(() => true);
        default:
          break;
      }
    }
  };
  const selQueSel = (data) => {
    const newLoc = { ...filter };
    if (data) {
      const subIds = [];
      data.forEach((c) => {
        if (c && c._id) {
          subIds.push(c._id);
        }
      });
      newLoc["selQuesId"] = [...new Set(subIds)];
      newLoc["selQue"] = data.filter(function (element) {
        return element !== undefined;
      });
    } else {
      newLoc["selQuesId"] = [];
      newLoc["selQue"] = [
        { label: "de", value: "de", name: "Please Select Care" },
      ];
    }
    setFilter(() => newLoc);
  };

  const setNetWork = async (c) => {
    localStorage.removeItem("lat");
    localStorage.removeItem("lng");
    localStorage.removeItem("zoom");
    if (c) {
      await setStateF(() => {
        return {
          selState: [{ label: "de", value: "de", name: "Please Select State" }],
          selStateId: [],
        };
      });
      // await handleSearch();
      await action.changeDistace("");
      setLocFilter(c);
      setCustomLodData(() => {
        return { currLoc: false, address: "" };
      });
      action.setDistace(1);
      setDes(() => 1);
      const data = {
        category: filter.subcategory.filter(
          (s) => s !== null && s !== undefined
        ),
        price: filter.selPrice.filter((_, idx) => idx !== 0),
        leaf: filter.leaf,
        specialQualification: filter.selQuesId.filter(
          (s) => s !== null && s !== undefined
        ),
        additionalResource: addRes,
        keywords: searchString,
        states: stateF.selStateId.filter((_, id) => id > 0),
        locFilter: c,
        customLocData: { currLoc: false, address: "" },
        des: 1,
        address: "true",
      };
      callProviderSearch(data);
      action.shareF(data);
      localStorage.setItem("localFilterData", JSON.stringify(data));
    } else {
      const data = {
        category: filter.subcategory.filter(
          (s) => s !== null && s !== undefined
        ),
        price: filter.selPrice.filter((_, idx) => idx !== 0),
        leaf: filter.leaf,
        specialQualification: filter.selQuesId.filter(
          (s) => s !== null && s !== undefined
        ),
        additionalResource: addRes,
        keywords: searchString,
        states: stateF.selStateId.filter((_, id) => id > 0),
        locFilter: c,
        customLocData: { currLoc: false, address: "" },
        des: 9999999,
        address: "",
      };
      action.shareF(data);
      localStorage.setItem("localFilterData", JSON.stringify(data));
      await callProviderSearch(data);
      await action.changeDistace("");
      await setStateF(() => {
        return {
          selState: [{ label: "de", value: "de", name: "Please Select State" }],
          selStateId: [],
        };
      });
      setCustomLodData(() => {
        return { currLoc: false, address: "" };
      });
      setLocFilter(c);
      action.setDistace(999999);
      setAddress(() => "");
    }
  };

  const handleOptionChange = (value) => {
    setSearchText(value);
  };

  const handelLeaf = async (l) => {
    await setFilter((old) => {
      return { ...old, leaf: l };
    });
    const data = {
      category: filter.subcategory.filter((s) => s !== null && s !== undefined),
      price: filter.selPrice.filter((_, idx) => idx !== 0),
      leaf: l,
      specialQualification: filter.selQuesId.filter(
        (s) => s !== null && s !== undefined
      ),
      additionalResource: addRes,
      keywords: searchString,
      states: stateF.selStateId.filter((_, id) => id > 0),
      locFilter: locFilter,
      customLocData: customLocData,
      des: des,
      address: address,
    };
    action.shareF(data);
    localStorage.setItem("localFilterData", JSON.stringify(data));

    callProviderSearch(data);
  };
  useEffect(() => {
    if (firstLoad) handleSearch();
  }, [addRes]);

  const handleSearch = async (
    debo,
    val,
    filt,
    stat,
    addr,
    locFilterA,
    customLocDataA,
    desA,
    addressA
  ) => {
    if (debo) {
      const data = {
        category: filt.subcategory.filter((s) => s !== null && s !== undefined),
        price: filt.selPrice.filter((_, idx) => idx !== 0),
        leaf: filt.leaf,
        specialQualification: filt.selQuesId.filter(
          (s) => s !== null && s !== undefined
        ),
        additionalResource: addr,
        keywords: val,
        states: stat.selStateId.filter((_, id) => id > 0),
        locFilter: locFilterA,
        customLocData: customLocDataA,
        des: desA,
        address: addressA,
      };

      action.shareF(data);
      localStorage.setItem("localFilterData", JSON.stringify(data));
      callProviderSearch(data);
    } else {
      const data = {
        category: filter.subcategory.filter(
          (s) => s !== null && s !== undefined
        ),
        price: filter.selPrice.filter((_, idx) => idx !== 0),
        leaf: filter.leaf,
        specialQualification: filter.selQuesId.filter(
          (s) => s !== null && s !== undefined
        ),
        additionalResource: addRes,
        keywords: searchString,
        states: stateF.selStateId.filter((_, id) => id > 0),
        locFilter: locFilter,
        customLocData: customLocData,
        des: des,
        address: address,
      };
      action.shareF(data);
      localStorage.setItem("localFilterData", JSON.stringify(data));
      const res = providerSearchRes.filter(
        (v) => v.virtual !== true && v.homeVisit !== true
      );
      const stateLength = data?.states?.length === 1 && res.length > 0;
      localStorage.setItem("zoom", stateLength ? 6 : 4);
      callProviderSearch(data);
    }
  };
  const clearFilter = async () => {
    const data = {
      price: [],
      leaf: false,
      specialQualification: [],
      additionalResource: addRes,
      keywords: "",
      states: [],
      locFilter: false,
      customLocData: {
        currLoc: false,
        address: "",
      },
      des: des,
      address: "",
    };
    setAddress(() => "");
    setLeafApp(true);
    setCustomLodData({
      currLoc: false,
      address: "",
    });
    action.setDistace(999999);
    callProviderSearch(data);
    await action.shareF(data);
    localStorage.setItem("localFilterData", JSON.stringify(data));
    const sr = [];
    for (let i = 0; i < spaceRes.length; i++) {
      sr.push(
        { subCat: true, _id: spaceRes[i]._id, name: spaceRes[i].name },
        ...Object.values(spaceRes[i].specialQualification).map((e) => {
          return { ...e, subCat: false };
        })
      );
    }
    setSpacification(() => sr);
    setLocFilter(() => false);
    setSearchString(() => "");
    await setStateF(() => {
      return {
        selState: [{ label: "de", value: "de", name: "Please Select State" }],
        selStateId: [],
      };
    });
    setFilter(() => {
      return {
        subcategory: [],
        selCat: [{ label: "de", value: "de", name: "Please Select Care" }],
        selPrice: ["Please Select Price"],
        selQue: [{ label: "de", value: "de", name: "Please Select Care" }],
        selQuesId: [],
        leaf: false,
      };
    });
  };
  const handleStateSelect = (s) => {
    const data = { ...stateF };
    if (s) {
      const ids = [];
      s.forEach((c) => {
        if (c && c.value) {
          ids.push(c.value);
        }
      });
      data["selStateId"] = [...new Set(ids)];
      data["selState"] = s.filter(function (element) {
        return element !== undefined;
      });
    } else {
      data["selStateId"] = [];
      data["selState"] = [
        { label: "de", value: "de", name: "Please Select State" },
      ];
    }
    setStateF(() => data);
  };

  return (
    <Grid item lg={2.5} md={12} sm={12} xs={12}>
      <Grid item lg={12} mb={2}>
        {filter.subcategory.length > 0 ||
        filter.selPrice.length > 1 ||
        filter.selQuesId.length > 1 ||
        stateF.selStateId.length > 1 ||
        searchString ? (
          <div className={classes.clearDivOuter} onClick={() => clearFilter()}>
            <div className={classes.clearInnerDiv}>X CLEAR FILTERS</div>
          </div>
        ) : (
          ""
        )}
        <TextField
          fullWidth
          placeholder="Search by keyword"
          variant="outlined"
          value={searchString}
          onChange={(e) => findViaString(e.target.value)}
        />
      </Grid>
      <Grid item lg={12} mb={3}>
        <Card className={classes.dropDownCard}>
          <div
            className={classes.dropHeader}
            style={{ display: "flex", gap: "8px", justifyContent: "center" }}
          >
            SEARCH BY LOCATION{" "}
            <BasicSwitch
              checked={locFilter}
              onChange={(e) => setNetWork(e.target.checked)}
            />
          </div>

          {locFilter ? (
            <Grid container item lg={12} mt={2} mb={2} spacing={1}>
              <Grid item lg={12} md={12} sm={12} xs={12} margin="auto">
                <div className={classes.dropLocContainer}>
                  <GpsFixed /> Current Location{" "}
                  <BasicSwitch
                    checked={customLocData.currLoc}
                    onChange={(e) => changeCustLocFlag(e.target.checked)}
                  />
                </div>
              </Grid>
              {!customLocData.currLoc ? (
                <Grid item lg={12} md={12} sm={12} xs={12} margin="auto">
                  <CustomAutoComp
                    label="Address"
                    value={customLocData.address}
                    onchange={(v) =>
                      setCustomLodData((old) => {
                        return { ...old, address: v };
                      })
                    }
                    onSelect={(data) => selAutoComplete(data)}
                  />
                </Grid>
              ) : null}
              <Grid item lg={2} md={2} sm={2} xs={2} margin="auto">
                1 m
              </Grid>
              <Grid item lg={8} md={8} sm={8} xs={8} margin="auto">
                <Slider
                  aria-label="Default"
                  min={1}
                  valueLabelDisplay="auto"
                  size="small"
                  onChange={(e) => loadDistace(e.target.value)}
                  value={des}
                />
              </Grid>
              <Grid item lg={2} md={2} sm={2} xs={2} margin="auto">
                100 m
              </Grid>
            </Grid>
          ) : (
            <Select
              onAnimationEnd={() => inputRef.current.focus()}
              open={stateOpen}
              onClick={() => handleSelectclose("state")}
              fullWidth
              multiple
              onClose={() => handleSelectOpen("state")}
              value={stateF.selState}
              sx={selectSx}
              id="state-id"
              MenuProps={selectProps}
              renderValue={(selected) => (
                <div className={classes.selectOptionDiv}>
                  {selected.length > 1 ? (
                    selected.map(
                      (value, id) =>
                        id > 0 &&
                        value && (
                          <Chip
                            key={value.name}
                            label={value.name}
                            className={classes.selectChipStyle}
                          />
                        )
                    )
                  ) : (
                    <div>{selected[0].name}</div>
                  )}
                </div>
              )}
              onChange={(e) => handleStateSelect(e.target.value)}
            >
              <ListSubheader>
                SELECT STATE
                <Divider />
                <TextField
                  size="small"
                  autoFocus
                  ref={inputRef}
                  placeholder="Type to search..."
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleOptionChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key !== "Escape") {
                      e.stopPropagation();
                    }
                  }}
                />
              </ListSubheader>
              {displayedOptions?.map((c) => (
                <MenuItem
                  value={c}
                  key={c.value}
                  classes={{ selected: classes.selected }}
                >
                  <Checkbox
                    classes={{ checked: classes.selected }}
                    checked={stateF.selStateId.indexOf(c.value) > -1}
                  />
                  <ListItemText primary={c.name} />
                </MenuItem>
              ))}
              <div className={classes.okBtnDiv}>
                <div className={classes.itemSelectDiv}>
                  {stateF.selStateId && stateF.selStateId.length
                    ? stateF.selStateId.length - 1
                    : 0}{" "}
                  ITEMS SELECTED
                </div>
                <CustomButton
                  name="Ok"
                  varient="contained"
                  className={classes.okBtnStyle}
                  onclick={() => handleSelectOpen("state")}
                />
              </div>
            </Select>
          )}
        </Card>
      </Grid>
      <Grid item lg={12} mb={3}>
        <Card className={classes.dropDownCard}>
          <div
            className={classes.dropHeader}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            SELECT CARE
            {filter?.subcategory?.length > 1 && (
              <Tooltip
                title={
                  <div>
                    This narrows your results to organizations that offer help
                    in at least one of these categories.
                  </div>
                }
              >
                <HelpOutline
                  style={{ marginLeft: "2px", marginRight: "0px" }}
                  fontSize="small"
                />
              </Tooltip>
            )}
          </div>

          <Select
            open={catOpen}
            onClick={() => handleSelectclose("cat")}
            fullWidth
            multiple
            onClose={() => handleSelectOpen("cat")}
            value={filter.selCat}
            sx={selectSx}
            MenuProps={
              sug && sug.length
                ? {
                    ...selectProps,
                    sx: { maxHeight: "450px", marginLeft: "5px" },
                  }
                : selectProps
            }
            renderValue={(selected) => (
              <div className={classes.selectOptionDiv}>
                {selected.length > 1 ? (
                  selected.map(
                    (value, id) =>
                      id > 0 &&
                      value && (
                        <Chip
                          key={value._id}
                          label={value.name}
                          className={classes.selectChipStyle}
                        />
                      )
                  )
                ) : (
                  <div>{selected[0].name}</div>
                )}
              </div>
            )}
            onChange={(e) => selCat(e.target.value)}
          >
            <ListSubheader className={classes.listHeaderDiv}>
              SELECT CARE
              <Divider />
            </ListSubheader>

            {cat.map((c) => {
              if (c.cat) {
                return <ListSubheader key={c._id}>{c.name}</ListSubheader>;
              } else {
                return (
                  <MenuItem
                    value={c}
                    key={c._id}
                    classes={{ selected: classes.selected }}
                  >
                    <Checkbox
                      checked={filter.subcategory.indexOf(c._id) > -1}
                      classes={{ checked: classes.selected }}
                    />
                    <ListItemText primary={c.name} />
                  </MenuItem>
                );
              }
            })}

            <div
              className={classes.okBtnDiv}
              style={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "2px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                }}
              >
                <div className={classes.itemSelectDiv}>
                  {filter.subcategory && filter.subcategory.length
                    ? filter.subcategory.length
                    : 0}{" "}
                  ITEMS SELECTED
                </div>

                <CustomButton
                  name="Ok"
                  varient="contained"
                  className={classes.okBtnStyle}
                  onclick={() => handleSelectOpen("cat")}
                  styled={{}}
                />
              </div>

              {/* {sug && sug.length ? (
                <div
                  style={{
                    marginTop: "8px",
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: "100px",
                    overflow: "auto",
                  }}
                >
                  <Divider />
                  <span style={{ padding: "5px" }}>SIMILAR SEARCHES</span>
                  <div
                    style={{
                      display: "flex",
                      maxWidth: "500px",
                      padding: "5px",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    {" "}
                    {sug.map((s) => (
                      <span style={{ color: "#1976D2" }}>{s},</span>
                    ))}
                  </div>
                </div>
              ) : null} */}
            </div>
          </Select>
        </Card>
      </Grid>

      <Grid item lg={12} mb={3}>
        <Card className={classes.dropDownCard}>
          <div className={classes.dropHeader}>FILTER BY PRICE</div>
          <Select
            open={priceOpen}
            onClick={() => handleSelectclose("price")}
            fullWidth
            multiple
            onClose={() => handleSelectOpen("price")}
            value={filter.selPrice}
            sx={selectSx}
            MenuProps={selectProps}
            renderValue={(selected) => (
              <div className={classes.selectOptionDiv}>
                {selected.length > 1 ? (
                  selected.map((value, id) =>
                    id > 0 && value ? (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.selectChipStyle}
                      />
                    ) : null
                  )
                ) : (
                  <div>{selected[0]}</div>
                )}
              </div>
            )}
            onChange={(e) => {
              const priceF = e.target.value.filter((a) => {
                return a !== undefined;
              });
              setFilter((old) => {
                return { ...old, selPrice: priceF };
              });
            }}
          >
            <ListSubheader className={classes.listHeaderDiv}>
              SELECT PRICE
              <Divider />
            </ListSubheader>

            {priceListData.map((c) => {
              return (
                <MenuItem
                  value={c.value}
                  key={c._id}
                  classes={{ selected: classes.selected }}
                >
                  <Checkbox
                    classes={{ checked: classes.selected }}
                    checked={filter.selPrice.indexOf(c.value) > -1}
                  />
                  <ListItemText primary={c.label} />
                </MenuItem>
              );
            })}
            <div className={classes.okBtnDiv}>
              <div className={classes.itemSelectDiv}>
                {filter.selPrice && filter.selPrice.length
                  ? filter.selPrice.length - 1
                  : 0}{" "}
                ITEMS SELECTED
              </div>
              <CustomButton
                name="Ok"
                varient="contained"
                className={classes.okBtnStyle}
                onclick={() => handleSelectOpen("price")}
              />
            </div>
          </Select>
        </Card>
      </Grid>
      <Grid item lg={12} mb={3}>
        <Card className={classes.dropDownCard}>
          <div className={classes.dropHeader}>
            FILTER BY SPECIAL QUALIFICATIONS
          </div>
          <Select
            open={specialQOpen}
            onClick={() =>
              filter.selCat &&
              filter.selCat.length > 1 &&
              specification &&
              specification.length
                ? handleSelectclose("spec")
                : false
            }
            fullWidth
            onClose={() => handleSelectOpen("spec")}
            disabled={
              filter.selCat &&
              filter.selCat.length > 1 &&
              specification &&
              specification.length
                ? false
                : true
            }
            multiple
            value={filter.selQue}
            sx={selectSx}
            MenuProps={selectProps}
            renderValue={(selected) => (
              <div className={classes.selectOptionDiv}>
                {selected.length > 1 ? (
                  selected.map(
                    (value, id) =>
                      id > 0 &&
                      value && (
                        <Chip
                          key={value._id}
                          label={value.name}
                          className={classes.selectChipStyle}
                        />
                      )
                  )
                ) : (
                  <div>{selected[0].name}</div>
                )}
              </div>
            )}
            onChange={(e) => selQueSel(e.target.value)}
          >
            <ListSubheader className={classes.listHeaderDiv}>
              SELECT QUALIFICATIONS
              <Divider />
            </ListSubheader>

            {specification.map((c) => {
              if (c.subCat) {
                return <ListSubheader key={c._id}>{c.name}</ListSubheader>;
              } else {
                return (
                  <MenuItem
                    value={c}
                    key={c._id}
                    classes={{ selected: classes.selected }}
                  >
                    <Checkbox
                      classes={{ checked: classes.selected }}
                      checked={filter.selQuesId.indexOf(c._id) > -1}
                    />
                    <ListItemText primary={c.name} />
                  </MenuItem>
                );
              }
            })}
            <div className={classes.okBtnDiv}>
              <div className={classes.itemSelectDiv}>
                {filter.selQuesId && filter.selQuesId.length
                  ? filter.selQuesId.length
                  : 0}{" "}
                ITEMS SELECTED
              </div>
              <CustomButton
                name="Ok"
                varient="contained"
                className={classes.okBtnStyle}
                onclick={() => handleSelectOpen("spec")}
              />
            </div>
          </Select>
        </Card>
      </Grid>

      {!addRes && (
        <Grid item lg={12} mb={3}>
          <Card className={classes.dropDownCard}>
            <div className={`${classes.dropHeader} ${classes.leafOuterDiv}`}>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  color: leafApp ? "black" : "gray",
                  cursor: leafApp ? "" : "not-allowed",
                }}
              >
                Leaf Provider Only{" "}
                <img src={LeafIcon} style={{ width: "24px", height: "24px" }} />
              </div>
              <BasicSwitch
                disabled={!leafApp}
                checked={filter.leaf}
                onChange={(e) => handelLeaf(e.target.checked)}
              />
              <Tooltip title="The leaf designation is used in some of Her PLAN’S subcategories to designate which providers support a green, natural approach toward reproductive health by supporting, not repressing, replacing, or blocking, their clients’ natural fertility and procreative potential.">
                <HelpOutline />
              </Tooltip>
            </div>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default React.memo(FilterCard);
