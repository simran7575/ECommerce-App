import { CustomStrings } from "../constants/CustomStrings";
import { getApi, postApi } from "./HttpClient";

export async function getAllProducts() {
  const headers = {
    Authorization: `Bearer ${CustomStrings.str09}`,
  };
  return await getApi("/products", headers);
}
export async function getAllCategories() {
  const headers = {
    Authorization: `Bearer ${CustomStrings.str09}`,
  };
  return await getApi("/categories/", headers);
}

export async function getProductDetails(id) {
  const headers = {
    Authorization: `Bearer ${CustomStrings.str09}`,
  };
  // const query = {
  //   id: id,
  // };
  return await getApi(`/products/${id}`, headers);
}
export async function getCategoryDetails(id) {
  const headers = {
    Authorization: `Bearer ${CustomStrings.str09}`,
  };
  // const query = {
  //   id: id,
  // };
  return await getApi(`/categories/${id}`, headers);
}

export async function createNewProduct(
  //data
  name,
  price,
  category,
  description,
  avatar
) {
  const headers = {
    Authorization: `Bearer ${CustomStrings.str09}`,
  };
  const body = {
    name: name,
    price: price,
    category: category,
    description: description,
    avatar: avatar,
    developerEmail: "simranbedi7575@gmail.com",
  };

  return await postApi("/products", body, headers);
}

export function validateNames(name) {
  if (!name) {
    return false;
  }
  name = name.trim();
  if (!name) {
    return false;
  }
  return true;

  // let letters = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
  // return letters.test(name) && name.length > 2;
}
export function validatePrice(price) {
  if (!price) {
    return false;
  }
  price = price.trim();
  if (!price) {
    return false;
  }
  let letters = /^\d{0,8}(\.\d{1,2})?$/;
  return letters.test(price);
  //email.match(letters);
}
export function validateImage(image) {
  if (!image) {
    return false;
  }
  image = image.trim();
  if (!image) {
    return false;
  }
  return true;
}
