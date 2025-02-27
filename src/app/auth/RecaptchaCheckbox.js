import ReCAPTCHA from "react-google-recaptcha";

const RecaptchaCheckbox = ({ onChange }) => {
  return <ReCAPTCHA sitekey="6LeST4sqAAAAAGPLutiQMo68ycFThIdISU45OpRo" onChange={onChange} />;
};

// 6LcV5T8pAAAAAGdT0rJ8WArZ17vYb-7HZFeICNmY     baground

// 6Lcb3z8pAAAAAI5bEiU1mHr7Bd9Xg_QMmtXzeu53   type2

export default RecaptchaCheckbox;