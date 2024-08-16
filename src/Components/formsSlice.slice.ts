import { createSlice } from '@reduxjs/toolkit';
import { InputsForm } from '../utils/interfaces';

const initialState = {
  countries: [
    'Australia',
    'India',
    'Brazil',
    'South Africa',
    'New Zealand',
    'Germany',
    'Japan',
    'Canada',
    'Mexico',
    'Argentina',
    'United States',
    'France',
    'China',
    'Russia',
    'Italy',
    'Spain',
    'United Kingdom',
    'Ireland',
    'Sweden',
    'Norway',
    'Finland',
    'Denmark',
    'Poland',
    'Netherlands',
    'Belgium',
    'Switzerland',
    'Austria',
    'Portugal',
    'Greece',
    'Turkey',
    'South Korea',
    'Singapore',
    'Thailand',
    'Malaysia',
    'Indonesia',
    'Philippines',
    'Vietnam',
    'Ukraine',
    'Belarus',
    'Georgia',
    'Lithuania',
    'Latvia',
    'Estonia',
    'Czech Republic',
    'Hungary',
    'Romania',
    'Bulgaria',
    'Croatia',
    'Slovakia',
    'Slovenia',
    'Serbia',
    'Bosnia and Herzegovina',
    'Montenegro',
    'Albania',
    'North Macedonia',
    'Kosovo',
    'Cyprus',
    'Malta',
    'Luxembourg',
    'Iceland',
  ],
  uncontrolledFormUsers: [],
  reactHookFormUsers: [],
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState: initialState,
  reducers: {
    setUncontrolledFormUser: (state, action) => {
      state.uncontrolledFormUsers.push(action.payload as InputsForm as never);
    },
    setReactHookFormUser: (state, action) => {
      state.reactHookFormUsers.push(action.payload as InputsForm as never);
    },
  },
});

export const { setUncontrolledFormUser, setReactHookFormUser } =
  formsSlice.actions;
