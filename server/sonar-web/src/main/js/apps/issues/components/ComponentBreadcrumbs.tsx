/*
 * SonarQube
 * Copyright (C) 2009-2018 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import * as React from 'react';
import { Link } from 'react-router';
import { BranchLike, Component } from '../../../app/types';
import Organization from '../../../components/shared/Organization';
import { collapsePath, limitComponentName } from '../../../helpers/path';
import { getBranchLikeUrl, getCodeUrl } from '../../../helpers/urls';

interface Props {
  branchLike?: BranchLike;
  component?: Component;
  issue: {
    component: string;
    componentLongName: string;
    organization: string;
    project: string;
    projectName: string;
    subProject?: string;
    subProjectName?: string;
  };
  organization: { key: string } | undefined;
}

export default function ComponentBreadcrumbs({
  branchLike,
  component,
  issue,
  organization
}: Props) {
  const displayOrganization =
    !organization && (!component || ['VW', 'SVW'].includes(component.qualifier));
  const displayProject = !component || !['TRK', 'BRC', 'DIR'].includes(component.qualifier);
  const displaySubProject = !component || !['BRC', 'DIR'].includes(component.qualifier);

  return (
    <div className="component-name text-ellipsis">
      {displayOrganization && (
        <Organization linkClassName="link-no-underline" organizationKey={issue.organization} />
      )}

      {displayProject && (
        <span title={issue.projectName}>
          <Link className="link-no-underline" to={getBranchLikeUrl(issue.project, branchLike)}>
            {limitComponentName(issue.projectName)}
          </Link>
          <span className="slash-separator" />
        </span>
      )}

      {displaySubProject &&
        issue.subProject !== undefined &&
        issue.subProjectName !== undefined && (
          <span title={issue.subProjectName}>
            <Link className="link-no-underline" to={getBranchLikeUrl(issue.subProject, branchLike)}>
              {limitComponentName(issue.subProjectName)}
            </Link>
            <span className="slash-separator" />
          </span>
        )}

      <Link
        className="link-no-underline"
        to={getCodeUrl(issue.project, branchLike, issue.component)}>
        <span title={issue.componentLongName}>{collapsePath(issue.componentLongName)}</span>
      </Link>
    </div>
  );
}
