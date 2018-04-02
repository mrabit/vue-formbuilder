import { inputConf } from "./Input";
import { selectConf } from "./Select";
import { radioConf } from "./Radio";
import { checkBoxConf } from "./CheckBox";
import { cascaderConf } from "./Cascader";
import { textConf } from "./Text";
import { titleConf } from "./Title";
import { hrConf } from "./Hr";
import { pConf } from "./P";

const formList = {
  Input: inputConf,
  Select: selectConf,
  Radio: radioConf,
  CheckBox: checkBoxConf,
  Cascader: cascaderConf,
  Text: textConf,
  Title: titleConf,
  Hr: hrConf,
  P: pConf,
};
let list_arr = [];
for (let i in formList) {
  list_arr.push({
    type: i,
    obj: formList[i]
  });
}
// console.log(formList)
export default list_arr;
