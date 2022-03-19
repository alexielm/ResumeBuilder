import { ViewControl } from '../generalUtils/ViewControl';
import { Data } from '../generalUtils/DataUtils';

export const SpecialLinks = (specialLinks) =>
    <ViewControl visible={specialLinks?.length && Data.SpecialView}>
        <span className="SpecialLinks">
            [{specialLinks.map((specialLink, specialLinkIndex) => <a key={specialLinkIndex} href={specialLink.link} rel="noreferrer" target="_blank">{specialLink.source}</a>)}]
        </span>
    </ViewControl>

