export const capLetter = (str) => {
  if (str) {
    const arr = str.toLowerCase().split(" ");

    //loop through each element of the array and capitalize the first letter.

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== "and" && arr[i] !== "or") {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }
    }

    //Join all the elements of the array back into a string
    //using a blankspace as a separator
    const str2 = arr.join(" ");

    return str2;
  } else {
    return "";
  }
};
