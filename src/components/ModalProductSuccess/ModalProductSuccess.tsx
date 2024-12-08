import { IoMdCloseCircleOutline } from "react-icons/io";
import s from "./ModalProductSuccess.module.scss";

type Props = {
  setModalSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  page: "create" | "edit";
};

function ModalProductSuccess({ setModalSuccess, page }: Props) {
  return (
    <>
      <div className={s.modalProductSuccess}>
        <div className={s.container}>
          <IoMdCloseCircleOutline
            className={s.close}
            onClick={() => {
              setModalSuccess(false);
            }}
          />
          <h2>Статья успешно {page === "edit" ? "обновлена" : "добавлена"}</h2>
          <div
            className={s.button}
            onClick={() => {
              setModalSuccess(false);
            }}>
            Закрыть
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalProductSuccess;
