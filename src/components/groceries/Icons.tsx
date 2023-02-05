import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { 
    faDrumstickBite, 
    faLeaf, 
    faAppleWhole,
    faMortarPestle,
    faCookieBite,
    faGlassWater
} from "@fortawesome/free-solid-svg-icons";

type IconAndColorProp = {
    icon: IconDefinition,
    color: string 
}

export const icons: { [type: string]: IconAndColorProp } = {
    "Vegetables": { icon: faLeaf, color: "green" },
    "Fruit": { icon: faAppleWhole, color: "#e60d5b" },
    "Meat": { icon: faDrumstickBite, color: "#5f1b28" },
    "Vegan": { icon: faLeaf, color: "green" },
    "Seasoning": { icon: faMortarPestle, color: "brown" },
    "Sweet": { icon: faCookieBite, color: "#f46197" },
    "Drink": { icon: faGlassWater, color: "#219ebc" }
};
