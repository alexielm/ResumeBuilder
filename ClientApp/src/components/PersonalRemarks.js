import MarkDown from './MarkDown';

export const PersonalRemarks = ({ remarks }) => (
    <ul>
        {
            remarks.map((remark, remarkIndex) => <li key={remarkIndex}><MarkDown>{remark}</MarkDown>.</li>)
        }
    </ul>
)
