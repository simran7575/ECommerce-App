import { CustomStrings } from "../constants/CustomStrings";
import { getApi, postApi } from "./HttpClient";

export async function getAllProducts(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return await getApi("/products", headers);
}
export async function getAllCategories(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return await getApi("/categories", headers);
}

export async function getProductDetails(id) {
  const headers = {
    Authorization: `Bearer ${CustomStrings.str09}`,
  };
  const query = {
    id: id,
  };
  return await getApi(`/product`, headers, query);
}
export async function getCategoryDetails(id) {
  const headers = {
    Authorization: `Bearer ${CustomStrings.str09}`,
  };
  const query = {
    id: id,
  };
  return await getApi(`/category}`, headers, query);
}

export async function createNewProduct(
  token,
  name,
  price,
  category,
  description,
  avatar
) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const body = {
    name: name,
    price: price,
    category: category,
    description: description,
    avatar: avatar,
    developerEmail: CustomStrings.str02,
  };

  return await postApi("/product/create", body, headers);
}
export async function getUserDetails(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await getApi("/user", headers);
}
export async function signUp(firstName, lastName, email, password) {
  const body = {
    firstName,
    lastName,
    email,
    password,
  };
  return await postApi("/signup", body);
}
export async function login(email, password) {
  const body = {
    email,
    password,
  };
  return await postApi("/login", body);
}
export async function forgotpassword(email) {
  const body = {
    email,
  };
  return await postApi("/forgotpassword", body);
}
export async function verifyOtp(code) {
  const body = {
    code,
  };
  return await postApi("/verify", body);
}
export async function resetPassword(password, email) {
  const body = {
    password,
    email,
  };
  return await postApi("/password/reset", body);
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
export function validateNamesChars(name) {
  if (!name) {
    return false;
  }
  name = name.trim();
  if (!name) {
    return false;
  }

  let letters = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
  return letters.test(name) && name.length > 2;
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
export async function validateImage(image) {
  if (!image) {
    return false;
  }
  image = image.trim();
  if (!image) {
    return false;
  }

  async function checkImage(url) {
    var request = new XMLHttpRequest();
    await request.open("GET", url, true);
    await request.send();
    let status;
    return (request.onload = function () {
      status = request.status;
      return request.status == 200;
    });

    // const res = await fetch(url);
    // const buff = await res.blob();

    // return buff.type.startsWith("image/");
  }
  return await checkImage(image);
}
export function validateEmail(email) {
  email = email.trim();
  if (!email) {
    return false;
  }
  email = email.toLowerCase();
  let letters = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return letters.test(email);
  //email.match(letters);
}
export function validatePassword(password) {
  if (!password) {
    return false;
  }
  password = password.trim();
  if (!password) {
    return false;
  }

  let letters = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return letters.test(password);
  //email.match(letters);
}
export function validateCode(otp) {
  if (!otp) {
    return false;
  }
  otp = otp.trim();
  if (!otp) {
    return false;
  }

  return otp.length == 6;
  //email.match(letters);
}
