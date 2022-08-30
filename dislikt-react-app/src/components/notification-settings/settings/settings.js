import { Container, Content, Setting, Header } from "./styled";
import Switch from '@material-ui/core/Switch'
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings'

const Settings = (props) => {
        
    return(
        <Container>
            <Content>
            <Header>
                <h1>Settings</h1>
                <SettingsIcon />
            </Header>
            <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography><h2>Notifications</h2></Typography>
                </AccordionSummary>
                <AccordionDetails className="details" >
                    <Setting>
                        <h3>Messages notifications</h3>
                        <Switch color="primary"/>
                    </Setting>
                    <Setting>
                        <h3>Follow notifications</h3>
                        <Switch color="primary"/>
                    </Setting>
                    <Setting>
                        <h3>Post notifications</h3>
                        <Switch color="primary"/>
                    </Setting>
                </AccordionDetails>
            </Accordion>
            <Accordion>
            <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography><h2>Help</h2></Typography>
                  </AccordionSummary>
                  <AccordionDetails className="details" >
                    <h2>Not implemented yet</h2>                
                  </AccordionDetails>
            </Accordion>
            <Accordion>
            <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography><h2>Theme</h2></Typography>
                  </AccordionSummary>
                  <AccordionDetails className="details" >
                    <h2>Not implemented yet</h2>
                </AccordionDetails>
            </Accordion>

            </Content>
        </Container>
    )
}

export default Settings;
