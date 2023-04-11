import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React from "react";
import FormGroupContainer from "./FormGroupContainer";

function RichTextField(props) {
  const {
    name,
    title,
    value,
    isReq,
    error,
    errorMsg,
    errorClass,
    divClass,
    config,
    setEditor,
    onChange,
    validationMessage,
    validationFunc,
    disabled,
    label,
    required = false,
    oldData = false,
  } = props;

  const msg = errorMsg || `Please Enter ${title}.`;
  const reqErrorMsg = msg;

  const changeHandler = (event, editor) => {
    const data = editor.getData();
    onChange(name, data);
  };
  const validationHandler = (event, editor) => {
    const data = editor.getData();
    let errorMsg = isReq ? null : undefined;
    if (data.trim() === "" && isReq) {
      errorMsg = validationMessage
        ? validationMessage.isReq
          ? validationMessage.isReq
          : reqErrorMsg
        : reqErrorMsg;
    }
    validationFunc(name, errorMsg);
  };

  const inputProps = {
    config,
    data: value || "",
    disabled,
    onInit: setEditor ? (editor) => setEditor(editor) : undefined,
  };

  return (
    <div className={divClass}>
      <FormGroupContainer required={required} label={label} oldData={oldData}>
        <CKEditor
          {...inputProps}
          onChange={changeHandler}
          editor={ClassicEditor}
          onBlur={validationHandler}
        />
        {error && (
          <span className={errorClass}>
            {error === true ? reqErrorMsg : error}
          </span>
        )}
      </FormGroupContainer>
    </div>
  );
}

export default RichTextField;
