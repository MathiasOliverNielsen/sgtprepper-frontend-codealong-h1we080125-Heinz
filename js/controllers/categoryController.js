import { getList } from "../models/categoryModel.js"

export const getCategoryList = async () => {
    const data = await getList()

    console.log(data)

    const formattedCategories = data.map(item => ({
        slug: item.slug,
        title: item.title,
        url: `/index.htm#/produkter?category=${item.slug}`
    }))
    
    console.log(formattedCategories);
    

    return formattedCategories
}