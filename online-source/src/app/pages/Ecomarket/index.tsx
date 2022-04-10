import {observer} from "mobx-react";
import {LayoutContainer} from "../../component/LayoutCointainer";
import styles from "./index.module.sass";
import {Button} from "../../component/ui/Button";
import {Checkbox} from "../../component/ui/Checkbox";
import {useState} from "react";
import {useStores} from "../../utils/use-stores-hook";
import {CommodityCard} from "../../component/ui/CommodityCard";
import {Cost} from "../../component/ui/Cost";
import {CheckboxGroup} from "../../component/ui/Checkbox-group";
import {isAction} from "mobx";

interface IItem {
    name: string;
    checked: boolean;
}
const allGender: IItem[] = [
    { name: "Мужской", checked: false },
    { name: "Женский", checked: false },
]
const allCategories: IItem[] = [
    { name: "Одежда", checked: false },
    { name: "Обувь", checked: false },
    { name: "Аксессуары", checked: false },
]
const allSortings: IItem[] = [
    { name: "По популярности", checked: false },
    { name: "По цене", checked: false },
    { name: "По новизне", checked: false },
]

export const Ecomarket = observer(() => {
    const { commoditiesStore: { commodities } } = useStores();
    const [ isOpenFilters, setIsOpenFilters ] = useState(false);

    let filterData = commodities;

    const [categories, setCategories] = useState(allCategories)
    const [genders, setGenders] = useState(allGender)
    const [sortings, setSorting] = useState(allSortings)
    const [allItemsCategories, setAllItemsCategories] = useState(false)

    const updateCheckStatus = (index: number, setItems: any, items: IItem[]) => {
        setItems(
            items.map((item: IItem, currentIndex: number) =>
                currentIndex === index ? {...item, checked: !item.checked} : item
            )
        )
    }

    const updateCheckStatusAll = ( allItems: boolean, setAllItems: any, setItems: any, items: IItem[] ) => {
        setAllItems(!allItems)
        setItems(
            items.map((item: IItem) =>
                allItems ? {...item, checked: false} :
                {...item, checked: true}
            )
        )
    }

    const handleClickSort = ( index: number ) => {
        setSorting(sortings.map((sorting: IItem, currentIndex: number) => currentIndex === index ?
            {...sorting, checked: true}
            : {...sorting, checked: false}))
    }


    return (
        <LayoutContainer>
            <div className={ styles.wrapper }>
                <div className={ isOpenFilters ? styles.wrapper__mobile__active : styles.wrapper__mobile }>
                </div>
                <div className={ styles.title__info }>
                    <h1 className={ styles.title}>
                        Экомаркет
                    </h1>
                    <Button
                        className={ styles.btn__filters }
                        text={ "Фильтры" }
                        type={"button"}
                        status={"tertiary"}
                        onClick={() => setIsOpenFilters(!isOpenFilters)}
                        />
                    <div className={ isOpenFilters ? styles.btn__filters__items__mobile : styles.btn__filters__items } >
                        { sortings.map((sorting, index) => (
                            <Button
                                text={ sorting.name }
                                type={"button"}
                                status={"tertiary"}
                                isActive={ sorting.checked }
                                onClick={() => {
                                    handleClickSort(index)
                                    console.log( sorting.checked )
                                }}/>
                        ))
                        }
                    </div>
                </div>
                <div className={ styles.goods }>
                    <div className={ isOpenFilters ?styles.goods__wrapper__mobile : styles.goods__wrapper }>
                        <div className={ isOpenFilters ? styles.goods__filtration__mobile : styles.goods__filtration }>
                            <h3 className={ styles.goods__title }>
                                Пол
                            </h3>
                            { genders.map((gender, index) => (
                                <Checkbox
                                    className = { styles.checkboxes }
                                    isChecked={gender.checked}
                                    checkHandler={() => updateCheckStatus(index, setGenders, genders)}
                                    text={gender.name}
                                    index={index}
                                />
                            ))
                            }
                            <h3 className={ styles.goods__title }>
                                Тип товара
                            </h3>
                            <CheckboxGroup
                                className = { styles.checkboxes }
                            />
                            { categories.map((category, index) => (
                                <Checkbox
                                    className = { styles.checkboxes }
                                    isChecked={category.checked}
                                    checkHandler={() => updateCheckStatus(index, setCategories, categories)}
                                    text={category.name}
                                    index={index}
                                />
                            ))
                            }
                        </div>
                    </div>
                    <div className={ styles.goods__items }>
                        { filterData.map((commodity, index) => (
                            <CommodityCard
                                title = { commodity.title }
                                category={ commodity.category}
                                cost={ commodity.cost }
                                posterImg={ commodity.posterImg}
                                brand={ commodity.brand}
                            />
                        ))
                        }
                    </div>
                </div>
            </div>
        </LayoutContainer>
    )
})