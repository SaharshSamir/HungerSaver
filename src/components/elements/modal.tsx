interface Props {
  buttonTitle: string
  children: React.ReactNode
}

const Modal = (props: Props) => {
  return (
    <>
      <label htmlFor="my-modal-4" className="btn btn-primary">{props.buttonTitle}</label>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          {props.children}
        </label>
      </label>
    </>
  )
}

export default Modal;
