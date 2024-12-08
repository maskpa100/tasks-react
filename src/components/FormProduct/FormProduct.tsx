import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ModalCropImage from "../ModalCropImage/ModalCropImage";
import s from "./FormProduct.module.scss";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { validationRules } from "./validationRules";
import { useDispatch } from "react-redux";
import {
  addProduct,
  Product,
  updateProductById,
} from "../../store/slice/ProductsSlice";
import ModalProductSuccess from "../ModalProductSuccess/ModalProductSuccess";

type Props = {
  page: "create" | "edit";
  product?: Product;
};

function FormProduct({ page, product }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [modalCropOpen, setModalCropOpen] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedImg, setCroppedImg] = useState<string | null>(
    product?.img ?? null
  );
  const [imageError, setImageError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setModalCropOpen(true);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      console.log("Картинка добавлена:", file);
    } else {
      console.log("Картинка не выбрана");
    }
  };

  const handleDeleteImg = () => {
    setCroppedImg(null);
    setSelectedImage(null);
  };
  const onSubmit = (data: any) => {
    if (!croppedImg) {
      setImageError("Изображение обязательно для добавления.");
      return;
    }
    setImageError(null);
    setModalSuccess(true);
    console.log("Данные формы:", { ...data, croppedImg });
    if (page === "create") {
      const newProduct = {
        id: Date.now(),
        like: false,
        img: croppedImg,
        ...data,
      };
      dispatch(addProduct(newProduct));
    }
    if (page === "edit") {
      const updatedProduct = {
        id: product?.id,
        like: false,
        img: croppedImg,
        ...data,
      };
      dispatch(updateProductById(updatedProduct));
    }
  };

  return (
    <div className={s.formProduct}>
      {modalSuccess && (
        <ModalProductSuccess setModalSuccess={setModalSuccess} page={page} />
      )}
      {modalCropOpen && (
        <ModalCropImage
          image={selectedImage}
          setCroppedImg={setCroppedImg}
          setOpen={setModalCropOpen}
          setImageError={setImageError}
        />
      )}
      <h1>{page == "edit" ? "Редактирования" : "Добавление"} товара</h1>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        {!croppedImg && (
          <div className={s.inputFile}>
            <input id="fileInput" type="file" onChange={handleImageUpload} />
            <label htmlFor="fileInput">Загрузить изображение</label>
          </div>
        )}
        {croppedImg && (
          <div className={s.img}>
            <img src={croppedImg} alt="Image" />
            <IoMdCloseCircleOutline
              className={s.close}
              onClick={handleDeleteImg}
            />
          </div>
        )}
        {imageError && <p className={s.error}>{imageError}</p>}
        <div className={s.block}>
          <label htmlFor="name">Названия товара</label>
          <input
            id="name"
            {...register("name", validationRules.name)}
            defaultValue={product?.name}
          />
          {errors.name?.message && (
            <p className={s.error}>{String(errors.name.message)}</p>
          )}
        </div>

        <div className={s.block}>
          <label htmlFor="price">Цена</label>
          <input
            id="price"
            type="number"
            {...register("price", validationRules.price)}
            defaultValue={product?.price}
          />
          {errors.price && (
            <p className={s.error}>{String(errors.price.message)}</p>
          )}
        </div>

        <div className={s.block}>
          <label htmlFor="weight">Вес</label>
          <input
            id="weight"
            type="number"
            {...register("weight", validationRules.weight)}
            defaultValue={product?.weight}
          />
          {errors.weight && (
            <p className={s.error}>{String(errors.weight.message)}</p>
          )}
        </div>

        <div className={s.block}>
          <label htmlFor="country_manufacture">Страна производитель</label>
          <input
            id="country_manufacture"
            {...register(
              "country_manufacture",
              validationRules.country_manufacture
            )}
            defaultValue={product?.country_manufacture}
          />
          {errors.country_manufacture && (
            <p className={s.error}>
              {String(errors.country_manufacture.message)}
            </p>
          )}
        </div>

        <div className={s.block}>
          <label htmlFor="time">Время добавления</label>
          <input
            id="time"
            {...register("time", validationRules.time)}
            defaultValue={product?.time}
          />
          {errors.time && (
            <p className={s.error}>{String(errors.time.message)}</p>
          )}
        </div>

        <div className={s.block}>
          <label htmlFor="descriptions">Описания</label>
          <textarea
            id="descriptions"
            rows={4}
            {...register("descriptions", validationRules.descriptions)}
            defaultValue={product?.descriptions}
          />
          {errors.descriptions && (
            <p className={s.error}>{String(errors.descriptions.message)}</p>
          )}
        </div>

        <button className={s.btnSubmit} type="submit">
          {page == "edit" ? "Обновить" : "Добавить"} товар
        </button>
      </form>
    </div>
  );
}

export default FormProduct;
