import { inputConf } from "./control/Input";
import { selectConf } from "./control/Select";
import { radioConf } from "./control/Radio";
import { checkBoxConf } from "./control/CheckBox";
import { cascaderConf } from "./control/Cascader";
import { textConf } from "./control/Text";
import { titleConf } from "./control/Title";
import { hrConf } from "./control/Hr";
import { pConf } from "./control/P";
import { uploadsConf } from './control/Uploads';

const formList = {
  Title: titleConf,
  Hr: hrConf,
  P: pConf,
  Input: inputConf,
  Select: selectConf,
  Radio: radioConf,
  CheckBox: checkBoxConf,
  Cascader: cascaderConf,
  Uploads: uploadsConf,
  Text: textConf
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
