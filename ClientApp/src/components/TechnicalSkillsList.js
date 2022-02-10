import { Component } from 'react';
import App from '../App';

export class TechnicalSkillsList extends Component {
    static displayName = TechnicalSkillsList.name;

    constructor(props) {
        super(props);
        let skillTypes = App.FrontEndParameters.skillTypes;
        let jobs = this.props.timeLine.filter(event => event.eventType === "Job");
        let disciplines = jobs.map(job => job.career.map(career => Object.keys(career.disciplines)).flat()).flat();

        console.log(skillTypes);

        this.skills = skillTypes
            .map(skillType => ({
                name: skillType.name,
                value: disciplines.filter(discipline => skillType.members.find(member => discipline.toLowerCase() === member.toLowerCase()))
            }))
            .filter(skill => skill.value.length > 0)
            .map((skill, skillIndex) =>
                <tr key={skillIndex}>
                    <td className="SkillName">{skill.name}</td>
                    <td className="SkillMembers">{skill.value.join(", ")}</td>
                </tr>
            );
    }

    render() {
        return (
            <table className="SkillsList">
                <tbody>
                    {this.skills}
                </tbody>
            </table>
        );
    }
}
