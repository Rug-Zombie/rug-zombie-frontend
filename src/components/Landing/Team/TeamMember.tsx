import React from 'react';
import { TeamMemberInfo } from './team';
import './team.css';

export interface TeamMemberProps {
  member: TeamMemberInfo
}

const TeamMember: React.FC<TeamMemberProps> = ({ member }) => {
  return(
    <div className="teamcard">
      <img src={member.profilePic} alt={member.name} className="img-team" />
      <div className='container'>
        <h2>{member.name}</h2>
        <h4>{member.title}{member.isFounder === true ? ' (Founder)' : null}</h4>
        <h5><a target='_blank' style={{color: 'green'}} href={`https://t.me/${member.telegramHandle}`} rel="noreferrer">@{member.telegramHandle}</a></h5>
        <h5><a href={`mailto:${member.email}`} target='_blank' rel='noreferrer' style={{color: 'yellowgreen'}}>{member.email}</a></h5>
      </div>
    </div>
  )
}

export default TeamMember;