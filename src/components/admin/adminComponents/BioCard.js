import React from 'react';
import { 
    Card, 
    Box, 
    Typography, 
    Divider,
    Stack, 
    Textarea, 
    FormHelperText,
    CardOverflow, 
    CardActions, 
    Button 
} from '@mui/joy';
import EditorToolbar from './EditorToolbar';

export const BioCard = () => {
    <Card>
        <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Bio</Typography>
            <Typography level="body-sm">
            Write a short introduction to be displayed on your profile
            </Typography>
        </Box>
        <Divider />
        <Stack spacing={2} sx={{ my: 1 }}>
            <EditorToolbar />
            <Textarea
            size="sm"
            minRows={4}
            sx={{ mt: 1.5 }}
            defaultValue="I'm a software developer based in Bangkok, Thailand. My goal is to solve UI problems with neat CSS without using too much JavaScript."
            />
            <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
            275 characters left
            </FormHelperText>
        </Stack>
        <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
            <Button size="sm" variant="outlined" color="neutral">
                Cancel
            </Button>
            <Button size="sm" variant="solid">
                Save
            </Button>
            </CardActions>
        </CardOverflow>
    </Card>
};