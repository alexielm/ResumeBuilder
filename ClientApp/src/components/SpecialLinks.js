import ViewControl from '../generalUtils/ViewControl';
import { viewerMode } from '../generalUtils/GlobalStore';

export const SpecialLinks = (specialLinks) =>
    <ViewControl visible={specialLinks?.length && viewerMode.specialView}>
        <span className="SpecialLinks">
            [{specialLinks.map((specialLink, specialLinkIndex) => <a key={specialLinkIndex} href={specialLink.link} rel="noreferrer" target="_blank">{specialLink.source}</a>)}]
        </span>
    </ViewControl>

