/**
 * @file builder.ts
 * @layer lib/api/endpoints
 * @description Typed endpoint factory with versioned paths.
 */

type Id = string | number;
type Version = `v${number}`;

const DEFAULT_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v1") as Version;

function v(override?: Version): string {
  return override ?? DEFAULT_VERSION;
}

export function endpoints(service: string) {
  function path(resource: string, version?: Version): string {
    const cleanResource = resource.replace(/^\/+|\/+$/g, "");
    const segment = cleanResource ? `/${cleanResource}` : "";
    return `/${service}/${v(version)}${segment}`;
  }

  function by(resource: string, version?: Version): (id: Id) => string {
    return (id: Id) => {
      const cleanResource = resource.replace(/^\/+|\/+$/g, "");
      const segment = cleanResource ? `/${cleanResource}` : "";
      return `/${service}/${v(version)}${segment}/${id}`;
    };
  }

  function crud(
    resource: string,
    versions?: {
      getAll?: Version;
      getById?: Version;
      post?: Version;
      put?: Version;
      delete?: Version;
      dropDown?: Version;
    },
  ) {
    const cleanResource = resource.replace(/^\/+|\/+$/g, "");
    const dropDownPath = cleanResource ? `${cleanResource}/dropdown` : "dropdown";

    return {
      base: path(resource, versions?.getAll),
      getAll: path(resource, versions?.getAll),
      getById: by(resource, versions?.getById),
      post: path(resource, versions?.post),
      put: by(resource, versions?.put),
      delete: by(resource, versions?.delete),
      dropDown: path(dropDownPath, versions?.dropDown),
    };
  }

  return { path, by, crud };
}
