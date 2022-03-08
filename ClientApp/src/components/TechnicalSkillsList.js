import { Component } from 'react';
import CurlyBracketLeft from './images/curly_bracket_left.svg';
import App from '../App';

export class TechnicalSkillsList extends Component {
    static displayName = TechnicalSkillsList.name;

    constructor(props) {
        super(props);
        let skillTypes = App.FrontEndParameters.skillTypes;
        let jobs = this.props.timeLine.filter(event => event.eventType === "Job");

        let disciplines = [...new Set(
            jobs
                .map(job => job
                    .career
                    .map(career => Object.keys(
                        career.otherDisciplines)
                    )
                    .flat()
                )
                .flat()
        )];

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
            <tr key={skillIndex} className="SkillRow">
                <td className="SkillName">{skill.name}</td>
                <td className="SkillConnector">
                    <img src={CurlyBracketLeft} className="CurlyBracketLeft" alt="CurlyBracketLeft" />
                </td>
                <td className="SkillMembers">{skill.value.map(v => v.replace(/ /g, "\u00a0")).join(", ")}</td>
            </tr>
        );

        let half = (skills.length / 2);

        this.leftSkillsColumn = this.skillList(skills.slice(0, half));
        this.rightSkillsColumn = this.skillList(skills.slice(half));
    }

    skillList(rows) {
        return (
            <table className="SkillsList">
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <table className="SkillsColumns">
                <tbody>
                    <tr>
                        <td className="LeftSkillsColumn">
                            {this.leftSkillsColumn}
                        </td>
                        <td className="RightSkillsColumn">
                            {this.rightSkillsColumn}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
