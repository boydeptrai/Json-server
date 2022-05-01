const { faker } = require('@faker-js/faker') 
const fs = require('fs')

// set locale to use Vietnamese
faker.locale= 'vi'

// random data
// console.log(faker.commerce.department());
// console.log(faker.commerce.productDescription());
// console.log(faker.commerce.department());

// console.log(faker.random.objectElement());
// console.log(faker.image.imageUrl());

const randomCategoryList = (n) =>{
    if(n<=0) return [];
    const categoryList = [];
    // Loop and push Category
    Array.from(new Array(n)).forEach(()=>{
        const category ={
            id: faker.datatype.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        categoryList.push(category)
    })
    return categoryList
};
const randomProductList = (categoryList,numberOfProducts)=>{
    if(numberOfProducts <=0) return [];
    const productList = [];
    // random data
    for(const category of categoryList){
        Array.from(new Array(numberOfProducts)).forEach(()=>{
            const product = {
                categoryId: category.id,
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: Number.parseFloat(faker.commerce.price()),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                thumbnailUrl: faker.image.imageUrl()
            }
            productList.push(product)
        })
    }

    return productList;

}
// IFFE
(()=>{
    //Random data
    const categoryList = randomCategoryList(5);
    const productList = randomProductList(categoryList,5)
   // prepare db object
   const db= {
       categories:categoryList,
       products:productList,
       profile:{
           name:'Po'
       },
   }
   // write db object to db.json
   fs.writeFile('db.json',JSON.stringify(db), ()=>{
       console.log('generate data successfully :))')
   })

})()