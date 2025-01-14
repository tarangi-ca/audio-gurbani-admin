import { Dialog } from "primereact/dialog"
import PropTypes from "prop-types"
import { CreateArtistForm } from "./artist-form"

export function CreateArtistDialog({ visible, setVisible }) {
    return (
        <Dialog
            header="Create Artist"
            visible={visible}
            onHide={() => {
                if (!visible) return
                setVisible(false)
            }}
        >
            <CreateArtistForm />
        </Dialog>
    )
}

CreateArtistDialog.propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
}
