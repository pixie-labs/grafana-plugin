/*
 * Copyright 2018- The Pixie Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DataQuery, DataSourceJsonData, SelectableValue } from '@grafana/data';
import { scriptOptions, Script } from './pxl_scripts';

// Types of available queries to the backend
export const enum QueryType {
  RunScript = 'run-script',
  GetClusters = 'get-clusters',
  GetPods = 'get-pods',
  GetServices = 'get-services',
  GetNamespaces = 'get-namespaces',
  GetNodes = 'get-nodes',
}

// predefined global dashboard variable name for cluster variable
export const CLUSTER_VARIABLE_NAME = 'pixieCluster';

// Describes variable query to be sent to the backend.
export interface PixieVariableQuery {
  queryType: QueryType;
  queryBody?: {
    clusterID?: string;
  };
}

// PixieDataQuery is the interface representing a query in Pixie.
// Pixie queries use PxL, Pixie's query language.
export interface PixieDataQuery extends DataQuery {
  queryType: QueryType;
  clusterID?: string;
  queryScript?: SelectableValue<Script>;
  queryBody?: {
    clusterID?: string;
    pxlScript?: string;
  };
  // queryMeta is used for UI-Rendering
  queryMeta?: {
    isColDisplay?: boolean;
    isGroupBy?: boolean;
    columnOptions?: Array<SelectableValue<number>>;
    groupByColOptions?: Array<SelectableValue<number>>;
    selectedColDisplay?: Array<SelectableValue<number>>;
    selectedColGroupby?: Array<SelectableValue<number>>;
    aggData?: Array<{ aggColumn: string; aggFunction: string }>;
  };
}

export const defaultQuery: Partial<PixieDataQuery> = {
  queryType: QueryType.RunScript,
  queryBody: {
    pxlScript: scriptOptions[0].value?.script ?? '',
  },
};

export interface PixieDataSourceOptions extends DataSourceJsonData {
  // Address of Pixie cloud.
  cloudAddr?: string;
}

export interface PixieSecureDataSourceOptions {
  // Pixie API key.
  apiKey?: string;
  // ID of the Pixie cluster to query.
  clusterId?: string;
}
