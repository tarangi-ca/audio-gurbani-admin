import { Menubar } from "primereact/menubar"
import PropTypes from "prop-types"
import { useNavigate } from "react-router"
import { QUERY_KEY as ARTIST_QUERY_KEY } from "../features/artist"
import { QUERY_KEY as COLLECTION_QUERY_KEY } from "../features/collection"

function NavigationBrand() {
    return <h3 className="m-0 px-3 py-0">Audio Gurbani</h3>
}

function NavigationItem({ key, label, command }) {
    return (
        <a
            key={key}
            href="#"
            onClick={command}
            className="no-underline text-color-secondary"
        >
            {label}
        </a>
    )
}

NavigationItem.propTypes = {
    key: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    command: PropTypes.func,
}

function NavigationItems() {
    const navigate = useNavigate()
    const items = [
        {
            label: "Artists",
            command: () => navigate(`/${ARTIST_QUERY_KEY}`),
        },
        {
            label: "Collections",
            command: () => navigate(`/${COLLECTION_QUERY_KEY}`),
        },
        {
            label: "Audios",
        },
    ]

    return (
        <div className="flex gap-3 p-2">
            {items.map(({ label, command }, index) => (
                <NavigationItem key={index} label={label} command={command} />
            ))}
        </div>
    )
}

export function NavigationMenu() {
    return <Menubar start={<NavigationBrand />} end={<NavigationItems />} />
}
