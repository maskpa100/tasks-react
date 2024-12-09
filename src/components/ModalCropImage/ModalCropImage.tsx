import { SetStateAction, useRef, useState } from "react";
import s from "./ModalCropImage.module.scss";
import AvatarEditor from "react-avatar-editor";
import { IoMdCloseCircleOutline } from "react-icons/io";

type Props = {
  image: string | null;
  setCroppedImg: (value: SetStateAction<string | null>) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setImageError: React.Dispatch<React.SetStateAction<string | null>>;
};

function ModalCropImage({
  image,
  setCroppedImg,
  setOpen,
  setImageError,
}: Props) {
  const editorRef = useRef<AvatarEditor>(null);
  const [zoom, setZoom] = useState(1);

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage();

      const imageDataURL = canvas.toDataURL("image/png");
      setCroppedImg(imageDataURL);
      setOpen(false);
      setImageError(null);
    }
  };
  return (
    <>
      <div className={s.modalCropImage}>
        <div className={s.container}>
          <IoMdCloseCircleOutline
            className={s.close}
            onClick={() => {
              setOpen(false);
            }}
          />
          <h3>Обрезать изображения</h3>
          <div className={s.img}>
            {image && (
              <AvatarEditor
                ref={editorRef}
                image={image}
                width={400}
                height={400}
                border={20}
                color={[234, 234, 234, 0.8]}
                className={s.avatarEditor}
                scale={zoom}
                rotate={0}
              />
            )}
          </div>
          <div className={s.zoom}>
            <div
              onClick={() => {
                setZoom(zoom + 0.1);
              }}>
              +
            </div>
            <div
              onClick={() => {
                setZoom(zoom - 0.1);
              }}>
              -
            </div>
          </div>
          <div className={s.saveImg} onClick={handleSave}>
            Обрезать изображение
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalCropImage;
