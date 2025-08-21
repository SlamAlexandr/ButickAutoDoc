let index = 0;
let result = {};
let timeoutList = {};
let maxIndex = document.querySelectorAll(".newad__step .catalog__control").length;
let baseLvl = 0;

let getIdFromString = (str) => {
    return str.split("_").slice(-1)[0]
}
let getAllRadioButtonNameLikeArray = () => {

    let items = document.querySelectorAll(".catalog__description-text");

    if(items.length) return {};
    let result = [];
    items.forEach((item) => result.push({
        "id": getIdFromString(item.parentNode.parentNode.getAttribute("for")),
        "name": item.innerHTML
    }));
    return result;
}

let getRadioButtonByIndex = (index, nthChild) => {
    return document.querySelectorAll(".newad__step:nth-child(" + nthChild + ") .catalog__control")[index]
}

let getRadioButtonNameByIndex = (index, nthChild) => {
    return getRadioButtonByIndex(index, nthChild).parentNode.querySelector(".catalog__description-text").innerHTML;
}

let clickToRadioButtonByIndex = (index, nthChild) => {
    getRadioButtonByIndex(index, nthChild).click()
    return true;
}
let getBackButton = () => {
    return document.querySelectorAll(".newad__breadcrumb-button")[baseLvl]
}
let clickToBackButton = () => {
    getBackButton().click();
}

let parseItemByIdWithNextStep = (index) => {
    let itemName = getRadioButtonNameByIndex(index, 1);
    let itemId = getIdFromString(getRadioButtonByIndex(index, 1).parentNode.getAttribute("for"))
    if(index > maxIndex) return;
    clickToRadioButtonByIndex(index, 1);
    setTimeout(() => {
        result[itemName] = {};
        result[itemName]["items"] = getAllRadioButtonNameLikeArray();
        result[itemName]["id"] = itemId;
        clickToBackButton()

        setTimeout(() => {
            index++;
            parseItemByIdWithNextStep(index);
        }, 1000);
    }, 1000)
}

parseItemByIdWithNextStep(index)