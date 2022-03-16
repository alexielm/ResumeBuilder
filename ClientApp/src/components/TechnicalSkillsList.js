import { Component } from 'react';
import CurlyBracketLeft from './images/curly_bracket_left.svg';
import moment from 'moment';
import App from '../App';

export class TechnicalSkillsList extends Component {
    static displayName = TechnicalSkillsList.name;

    prepareSkillsSet() {
        let skillTypes = App.FrontEndParameters.skillTypes;

        let jobEventTypes = this.props.timeLine.filter(event => event.eventType === "Job");
        let hobbyEventTypes = this.props.timeLine.filter(event => event.eventType === "Hobby");

        let disciplinesPerYearAA = jobEventTypes
            .map(job => job
                .career
                .map(career => career
                    .responsibilities
                    .map(responsibility => ({
                        disciplines: responsibility.disciplines,
                        startYear: moment(career.startDate).year(),
                        endYear: moment(career.endDate).year()
                    }))
                    .flat()
                    .concat({
                        disciplines: career.otherDisciplines,
                        startYear: moment(career.startDate).year(),
                        endYear: moment(career.endDate).year()
                    })
                )
                .flat()
            )
            .flat()
            .concat({
                disciplines: hobbyEventTypes.map(hobby => hobby.disciplines).flat(),
                startYear: 0,
                endYear: 0
            })
            .concat(
                this.props.skillsLevelTimeProgress
                    .map(event => ({
                        disciplines: Object.entries(event).filter(([key, value]) => value && (key !== "year")).map(([key, value]) => key),
                        startYear: event.year,
                        endYear: event.year
                    }))
            )
            .map(disciplinesInYear => disciplinesInYear.disciplines.map(discipline => ({
                discipline,
                startYear: disciplinesInYear.startYear,
                endYear: disciplinesInYear.endYear
            })))
            .flat();

        let disciplinesWithStartYear =
            disciplinesPerYearAA
                .reduce((current, { discipline, startYear }) => {
                    let currentYear = current[discipline];
                    if (currentYear === undefined) {
                        current[discipline] = startYear;
                    }
                    else {
                        if ((startYear > 0) && (current[discipline] > startYear)) {
                            current[discipline] = startYear;
                        }
                    }
                    return current;
                }, {});

        let disciplinesWithEndYear =
            disciplinesPerYearAA
                .reduce((current, { discipline, endYear }) => {
                    let currentYear = current[discipline];
                    if (currentYear === undefined) {
                        current[discipline] = endYear;
                    }
                    else {
                        if ((endYear > 0) && (current[discipline] < endYear)) {
                            current[discipline] = endYear;
                        }
                    }
                    return current;
                }, {});

        let disciplines = Object.keys(disciplinesWithStartYear);
        let currentYear = moment().year();
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
                <td className="SkillMembers">{skill
                    .value
                    .sort()
                    .map(skill => {
                        if (this.props.showYearsOfExperience) {
                            let startYear = disciplinesWithStartYear[skill];
                            if (startYear > 0) {
                                let endYear = disciplinesWithEndYear[skill] ?? currentYear;
                                let years = endYear - startYear;
                                return `${skill} (${years}+ year${years > 1 ? "s" : ""})`;
                            }
                        }
                        return skill;
                    })

                    .map(string => string.replace(/ /g, "\u00a0")).join(", ")}</td>
            </tr>
        );

        let half = (skills.length / 2) + 0.5;

        return {
            leftSkillsColumn: this.skillList(skills.slice(0, half)),
            rightSkillsColumn: this.skillList(skills.slice(half))
        }
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
       let skillsSet = this.prepareSkillsSet();
        return (
            <table className="SkillsColumns">
                <tbody>
                    <tr>
                        <td className="LeftSkillsColumn">
                            {skillsSet.leftSkillsColumn}
                        </td>
                        <td className="RightSkillsColumn">
                            {skillsSet.rightSkillsColumn}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
