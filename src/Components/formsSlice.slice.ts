import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InputsForm } from '../utils/interfaces';

interface FormsState {
  countries: string[];
  uncontrolledFormUsers: InputsForm[];
  reactHookFormUsers: InputsForm[];
}

const initialState: FormsState = {
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
    setUncontrolledFormUser: (state, action: PayloadAction<InputsForm>) => {
      state.uncontrolledFormUsers.push(action.payload);
    },
    setReactHookFormUser: (state, action: PayloadAction<InputsForm>) => {
      state.reactHookFormUsers.push(action.payload);
    },
    markAllFormsAsOld: state => {
      state.uncontrolledFormUsers.forEach(form => {
        form.isNew = false;
      });
      state.reactHookFormUsers.forEach(form => {
        form.isNew = false;
      });
    },
  },
});

export const {
  setUncontrolledFormUser,
  setReactHookFormUser,
  markAllFormsAsOld,
} = formsSlice.actions;
