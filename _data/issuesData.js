// _data/issues.js
const fs = require('fs');
const path = require('path');

module.exports = function() {
  const rawData = fs.readFileSync(path.join(__dirname, '../issue-pool.json'), 'utf8');
  const data = JSON.parse(rawData);
  
  const issues = [];
  
  Object.entries(data).forEach(([issueId, issueData]) => {
    issues.push({
      id: issueId,
      title: issueData.content_title,
      url: issueData.url,
      owner: issueData.repo_owner,
      isOpen: issueData.status_is_open,
      hasAssignee: issueData.status_has_assignee,
      author: issueData.people_author,
      assignee: issueData.people_assignee,
      createdDate: issueData.time_created_date,
      lastUpdated: issueData.time_last_updated,
      daysOld: issueData.time_days_old,
      commentCount: issueData.engagement_comment_count,
      reactionCount: issueData.engagement_reaction_count,
      labels: issueData.labels_list,
      labelCount: issueData.labels_count,
      isBeginner: issueData.flags_is_beginner_friendly,
      needsHelp: issueData.flags_needs_help,
      isBug: issueData.flags_is_bug,
      isFeature: issueData.flags_is_feature
    });
  });
  
  return issues;
};