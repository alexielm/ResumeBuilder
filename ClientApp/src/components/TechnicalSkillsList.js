import { Component } from 'react';
import App from '../App';

export class TechnicalSkillsList extends Component {
    static displayName = TechnicalSkillsList.name;

    constructor(props) {
        super(props);
        let skillTypes = App.FrontEndParameters.skillTypes;
        let jobs = this.props.timeLine.filter(event => event.eventType === "Job");
        let disciplines = [...new Set(jobs.map(job => job.career.map(career => Object.keys(career.disciplines)).flat()).flat())];

        let skillsByCategory = skillTypes
            .map(skillType => ({
                name: skillType.name,
                value: skillType.members.filter(member => {
                    let disciplineIndex = disciplines.findIndex(discipline => discipline.toLowerCase() === member.toLowerCase());
                    if (disciplineIndex === -1) {
                        return false;
                    }
                    disciplines.splice(disciplineIndex, 1);
                    return true;
                })
            }))
            .filter(skill => skill.value.length > 0);

        if (disciplines.length > 0) {
            skillsByCategory.push({
                name: "Others",
                value: disciplines
            });
        }

        let skills = skillsByCategory.map((skill, skillIndex) =>
            <tr key={skillIndex}>
                <td className="SkillName">{skill.name}</td>
                <td className="SkillMembers">{skill.value.join(", ")}</td>
            </tr>
        );

        let half = (skills.length / 2) + 1;

        this.leftSkillsColumn = skills.slice(0, half);
        this.rightSkillsColumn = skills.slice(half);
    }

    render() {
        return (
            <table className="SkillsColumns">
                <tbody>
                    <tr>
                        <td className="LeftSkillsColumn">
                            <table className="SkillsList">
                                <tbody>
                                    {this.leftSkillsColumn}
                                </tbody>
                            </table>
                        </td>
                        <td className="RightSkillsColumn">
                            <table className="SkillsList">
                                <tbody>
                                    {this.rightSkillsColumn}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
