export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const a = reader.result;
      return resolve(a);
    };
    reader.onerror = function (e) {
      console.log(e);
    };
  });
};
