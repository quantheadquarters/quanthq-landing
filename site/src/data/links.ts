// Single source of truth for every off-site link. These have been wrong in
// eight places at once before — add new externals here, never inline.
export const links = {
  linkedinGroup: 'https://www.linkedin.com/groups/36960154/',
  github: 'https://github.com/quantheadquarters',
  email: 'quantheadquarters@gmail.com',
} as const;

// The community lives in the LinkedIn group. There is no Discord.
export const JOIN_URL = links.linkedinGroup;
