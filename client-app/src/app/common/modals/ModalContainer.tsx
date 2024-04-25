import { observer } from "mobx-react-lite"
import { UseStore } from "../../stores/store"
import { Modal } from "semantic-ui-react";

export default observer( function ModalContainer() {
    const {modalStore}=UseStore();
  return (
    <>
        <Modal open={modalStore.modal.open} onClose={modalStore.closeModal} size="small" >
            <Modal.Content>
                {modalStore.modal.body}
            </Modal.Content>
            </Modal> 
    </>
  )
})
