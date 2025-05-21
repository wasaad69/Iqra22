import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  ReferenceField,
  TextInput,
  Filter
} from "react-admin";

const ChallengeOptionFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label="Search by Text" source="text" alwaysOn />
    <TextInput label="Challenge ID" source="challengeId" alwaysOn />
    <TextInput label="Challenge Question" source="challengeQuestion" alwaysOn />
  </Filter>
);

export const ChallengeOptionList = () => {
  return (
    <List filters={<ChallengeOptionFilter />}>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <TextField source="text" />
        <BooleanField source="correct" />
        <ReferenceField source="challengeId" reference="challenges" link="show">
          <TextField source="question" />
        </ReferenceField>
        <TextField source="imageSrc" />
        <TextField source="audioSrc" />
      </Datagrid>
    </List>
  );
};
