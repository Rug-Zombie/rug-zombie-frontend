import React from 'react';
import { TeamMemberInfo } from './team';
import './team.css';

export interface TeamMemberProps {
  member: TeamMemberInfo
}

const TeamMember: React.FC<TeamMemberProps> = ({ member }) => {
  return(
    <div className="teamcard">
      <img src={member.profilePic} alt={member.name} style={{width: 100, height: 100, borderRadius: 100/2, marginLeft: '38%'}} />
      <div className='container'>
        <h2>{member.name}</h2>
        <h4>{member.title}{member.isFounder === true ? ' (Founder)' : null}</h4>
        <h5>{member.telegramHandle}</h5>
        <h5>{member.email}</h5>
      </div>
    </div>
  )
}

export default TeamMember;