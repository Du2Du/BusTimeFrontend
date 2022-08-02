import React from "react";
import { Modal } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { Button, ButtonWithBorder } from "../../components";
import { ModalProps, StateModalProps } from "./interfaces";
import styles from "./withModal.module.scss";

export function WithModal<T>(
  Component: React.ComponentType<T & StateModalProps>
) {
  function wrapperElement({
    label,
    setShow,
    show,
    validate,
    ...rest
  }: ModalProps & T) {
    const hideF = () => {
      setShow(false);
    };
    return show ? (
      <Modal
        centered={true}
        className="pr-0"
        show={show}
        enforceFocus={false}
        onHide={hideF}
        size="xl"
        backdropClassName={styles.dialogIndex}
      >
        <Modal.Header className={styles.modalHeaderSticky}>
          <div className={`flex align-center justify-between w-100`}>
            <Modal.Title>{label}</Modal.Title>

            <div>
              <Button btnLabel="" className={`px-2 py-2`} onClick={hideF}>
                <AiOutlineClose size={20} />
              </Button>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Component show={show} setShow={setShow} {...(rest as any)} />
        </Modal.Body>
        <Modal.Footer>
          <ButtonWithBorder onClick={() => setShow(false)} btnLabel="Fechar" />
          <ButtonWithBorder
            onClick={(ev) => {
              validate(ev);
              setShow(false);
            }}
            btnLabel="Validar"
          />
        </Modal.Footer>
      </Modal>
    ) : (
      <></>
    );
  }
  return wrapperElement;
}
