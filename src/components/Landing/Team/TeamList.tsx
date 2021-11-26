import React from 'react';
import TeamMember from './TeamMember';
import { team } from './team';
import './team.css';

const TeamList: React.FC = () => {
  return (
    <>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <div id="Team" className="section-3">
        <h2 className="heading-2">Our Team</h2><br />
        <div className="row">
          <div className="teamcolumn">
            <TeamMember member={team[0]} />;
          </div>
          <div className="teamcolumn">
            <TeamMember member={team[1]} />;
          </div>
          <div className="teamcolumn">
            <TeamMember member={team[2]} />;
          </div>
        </div>
        <div className="row">
          <div className="teamcolumn">
            <TeamMember member={team[3]} />;
          </div>
          <div className="teamcolumn">
            <TeamMember member={team[4]} />;
          </div>
          <div className="teamcolumn">
            <TeamMember member={team[5]} />;
          </div>
        </div>
      </div>
    </>
  )
}

export default TeamList;