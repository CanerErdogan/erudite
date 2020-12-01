import React from 'react';
import { Card, FormControl, InputGroup } from 'react-bootstrap';

const tasks = ['Yoga', 'Erudite', 'Kahvaltı', 'Dune', 'Data', 'Yemek', 'Nutuk'];

export default function TaskList(props) {
  return (
    <Card style={{width: '30rem'}}>
      {tasks.map(task => {
        return (
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Checkbox />
            </InputGroup.Prepend>
            <FormControl
              placeholder="Task"
              value={task}
            />
          </InputGroup>
        );
      })}
    </Card>
        //   <InputGroup>
        //     <InputGroup.Prepend>
        //       <InputGroup.Checkbox />
        //     </InputGroup.Prepend>
        //     <FormControl
        //       placeholder="Task"
        //       style={{width: '90%'}}
        //       custom
        //       value={task}
        //     />
        //   </InputGroup>
        // )})}
  );
}
