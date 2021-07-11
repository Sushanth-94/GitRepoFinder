import React from 'react';
import '../App.css';

const GitCard = ({repo}) => {
  return (
    <div className="gitCardContainer">
      <div className="profile">
        <img
          src={`${repo.owner.avatar_url}`}
          alt={'userProfile'}
          width={'60%'}
          height={'60%'}
        />
        <a
          className="btnPrimary"
          href={repo.owner.html_url}
          target="_blank"
          rel="noreferrer">
          View Profile
        </a>
      </div>
      <div className="repoDetail">
        <div>Name: {repo.name}</div>
        <div>Description: {repo.description}</div>
        <div>License: {repo && repo.license ? repo.license.name : ''}</div>
        <div>
          <span className="label labelPrimary">Size: {repo.size}</span>
          <span className="label labelPrimary">Forks: {repo.forks}</span>
          <span className="label labelPrimary">Watchers: {repo.watchers}</span>
        </div>
        <div>Created At: {repo.created_at}</div>
        <div>Last Updated At: {repo.updated_at}</div>
        <a
          className="btnPrimary"
          target="_blank"
          rel="noreferrer"
          href={repo.html_url}>
          View Repo
        </a>
      </div>
    </div>
  );
};

export default GitCard;
