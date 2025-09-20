import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useConcentrationForm } from '../hooks/useConcentrationForm';

const ConcentrationList: React.FC = () => {

  const { concentrations } = useConcentrationForm();

  return (
    <Card sx={{ maxWidth: 600, margin: '2rem auto', boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Concentrations List
        </Typography>

        {concentrations.length === 0 ? (
          <Typography>No concentrations found</Typography>
        ) : (
          <List>
            {concentrations.map((c, index) => (
              <React.Fragment key={c._id}>
                <ListItem>
                  <ListItemText primary={`${c.name} - ${c.display_name}`} />
                </ListItem>
                {index < concentrations.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default ConcentrationList;
