import { Dialog } from "primereact/dialog"
import PropTypes from "prop-types"
import { CreateAudioForm } from "./audio-form"

export function CreateAudioDialog({ visible, setVisible }) {
    return (
        <Dialog
            header="Create Audio"
            visible={visible}
            onHide={() => {
                if (!visible) return
                setVisible(false)
            }}
        >
            <CreateAudioForm />
        </Dialog>
    )
}

CreateAudioDialog.propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
}
