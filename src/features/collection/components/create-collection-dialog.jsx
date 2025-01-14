import { Dialog } from "primereact/dialog"
import PropTypes from "prop-types"
import { CreateCollectionForm } from "./collection-form"

export function CreateCollectionDialog({ visible, setVisible }) {
    return (
        <Dialog
            header="Create Collection"
            visible={visible}
            onHide={() => {
                if (!visible) return
                setVisible(false)
            }}
        >
            <CreateCollectionForm />
        </Dialog>
    )
}

CreateCollectionDialog.propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
}
