import React, {useState} from 'react'
import ArrowDownIcon from "../../../../../images/Group 188.png"
import ArrowUpIcon from "../../../../../images/Group 2121.png"
import ProjectImage from "../../../../../images/project-image.png"

const Description: React.FC = () => {

    const projectDescription = "The MUTANT APE YACHT CLUB is a collection of up to 20,000 Mutant Apes that can only be created\n" +
        "                            by exposing an existing Bored Ape to a vial of MUTANT SERUM or by minting a Mutant Ape in the\n" +
        "                            public sale."

    const [description, setDescription] = useState(false)
    const [aboutProject, setAboutProject] = useState(false)
    const [properties, setProperties] = useState(false)
    const [details, setDetails] = useState(false)

    const toggleDescription = () => {
        setDescription(!description)
    }

    const toggleAboutProject = () => {
        setAboutProject(!aboutProject)
    }

    const toggleProperties = () => {
        setProperties(!properties)
    }

    const toggleDetails = () => {
        setDetails(!details)
    }

    const attributes = [
        {
            name: "background",
            value: "M1 Army Green",
            percentage: "9"
        },
        {
            name: "clothes",
            value: "M1 Bayc T Black",
            percentage: "2"
        },
        {
            name: "earring",
            value: "M1 Gold Stud",
            percentage: "5"
        },
        {
            name: "eyes",
            value: "M1 Bored",
            percentage: "8"
        },
        {
            name: "fur",
            value: "M1 Dark Brown",
            percentage: "4"
        },
        {
            name: "mouth",
            value: "M1 Bored",
            percentage: "7"
        },
    ]

    const contractAddress = "0xA34o....3432kjoij"
    const tokenID = "45"
    const tokenStandard = "ERC - 721"
    const blockChain = "Binance Smart Chain"

    return (
        <>
            <div className="description-container">
                <div className="description-heading">
                    <h2 className="width-90">Description</h2>
                    <button type="button" onClick={toggleDescription} className="arrow-icon">
                        <img src={description ? ArrowUpIcon : ArrowDownIcon} alt="arrow-icon"/>
                    </button>
                </div>
                {
                    description ?
                        (
                            <div>
                                <div className="separator"/>
                                <div className="description-heading">
                                    <h2 className="width-90">About Project</h2>
                                    <button type="button" onClick={toggleAboutProject} className="arrow-icon">
                                        <img src={aboutProject ? ArrowUpIcon : ArrowDownIcon} alt="arrow-icon"/>
                                    </button>
                                </div>
                                {
                                    aboutProject ?
                                        (
                                            <div>
                                                <div className="flex-container padding-top-bottom-5">
                                                    <img src={ProjectImage} alt="project" className="project-image"/>
                                                    <text className="project-description">{projectDescription}</text>
                                                </div>
                                            </div>
                                        ) : null
                                }
                                <div className="separator"/>
                                <div className="description-heading">
                                    <h2 className="width-90">Properties</h2>
                                    <button type="button" onClick={toggleProperties} className="arrow-icon">
                                        <img src={properties ? ArrowUpIcon : ArrowDownIcon} alt="arrow-icon"/>
                                    </button>
                                </div>
                                {
                                    properties ?
                                        (
                                            <div className="properties-container">
                                                {
                                                    attributes.map((attribute) => {
                                                        return (
                                                            <div className="property-card">
                                                                <text className="property-name">{attribute.name}</text>
                                                                <text className="property-value">{attribute.value}</text>
                                                                <text className="property-percentage">{attribute.percentage}% have this trait</text>
                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                        ) : null
                                }
                                <div className="separator"/>
                                <div className="description-heading">
                                    <h2 className="width-90">Details</h2>
                                    <button type="button" onClick={toggleDetails} className="arrow-icon">
                                        <img src={details ? ArrowUpIcon : ArrowDownIcon} alt="arrow-icon"/>
                                    </button>
                                </div>
                                {
                                    details ?
                                        (
                                            <div className="details-details-container">
                                                <div className="details-names">
                                                    <text>Contract Address</text>
                                                    <text>Token ID</text>
                                                    <text>Token Standard</text>
                                                    <text>Blockchain</text>
                                                </div>
                                                <div className="details-values">
                                                    <text className="text-highlighted">{contractAddress}</text>
                                                    <text className="text-highlighted">{tokenID}</text>
                                                    <text className="text-highlighted">{tokenStandard}</text>
                                                    <text className="text-highlighted">{blockChain}</text>
                                                </div>
                                            </div>
                                        ) : null
                                }
                            </div>
                        ) : null
                }
            </div>
        </>
    )
}

export default Description
