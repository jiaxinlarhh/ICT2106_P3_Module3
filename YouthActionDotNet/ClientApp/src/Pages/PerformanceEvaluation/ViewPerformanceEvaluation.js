import React from "react"
import { Loading } from "../../Components/appCommon"
import DatapageLayout from "../PageLayout"
import { Box } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import { Textarea } from "@chakra-ui/react"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { SimpleGrid } from '@chakra-ui/react'
import { ChakraProvider } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react"
import { Select } from '@chakra-ui/react'
import { Link } from "react-router-dom"
import { useState } from "react";
import { Collapse } from "@chakra-ui/react";
import { StdButton } from "../../Components/common"
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure
    } from "@chakra-ui/react";
    import {
        Accordion,
        AccordionItem,
        AccordionButton,
        AccordionPanel,
        AccordionIcon,
      } from '@chakra-ui/react'
        import { Text } from "@chakra-ui/react";
        import DatapageLayoutEmpty from "../PageLayoutEmpty"




function DrawerExample({ selectedOption1, onOptionChange1, selectedOption2, onOptionChange2, selectedOption3, onOptionChange3, selectedOption4, onOptionChange4 }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
  
    const reset = () => {
      onOptionChange1({ target: { value: '' } });
      onOptionChange2({ target: { value: '' } });
      onOptionChange3({ target: { value: '' } });
      onOptionChange4({ target: { value: '' } });
      onClose();
    }
  
    return (
      <>
        <Button ref={btnRef} onClick={onOpen} style={{ backgroundColor: '#1c2c5b', color: 'white', marginLeft: '20px' }}>Filter</Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Filter Option</DrawerHeader>
  
            <DrawerBody>
              
              Choose a Filter Option:
              <br/><br/><br/><br/>
  
              Service Center
              <br/><br/>
              <Select placeholder='- Select a Service Center -' size='sm' value={selectedOption1} onChange={onOptionChange1}>
                  <option value='sc1'>1</option>
                  <option value='sc2'>2</option>
                  <option value='sc3'>3</option>
                  <option value='sc4'>4</option>
                  <option value='sc5'>5</option>
                  <option value='sc6'>6</option>
                  <option value='sc7'>7</option>
                  <option value='sc8'>8</option>
              </Select>
                  
                  <br/><br/>
  
              Performance
              <br/><br/>
              <Select placeholder='- Select a Performance -' size='sm' value={selectedOption2} onChange={onOptionChange2}>
                  <option value='Excellent'>Excellent</option>
                  <option value='Good'>Good</option>
                  <option value='Fair'>Fair</option>
                  <option value='Poor'>Poor</option>
                  <option value='Bad'>Bad</option>
                  </Select>

                  <br/><br/>
  
              Quarter
              <br/><br/>
              <Select placeholder='- Select a Quarter -' size='sm' value={selectedOption3} onChange={onOptionChange3}>
                  <option value='Q1'>Q1</option>
                  <option value='Q2'>Q2</option>
                  <option value='Q3'>Q3</option>
                  <option value='Q4'>Q4</option>
                  </Select>


                  <br/><br/>
  
              Year
              <br/><br/>
              <Select placeholder='- Select a Year -' size='sm' value={selectedOption4} onChange={onOptionChange4}>
                  <option value='2021'>2021</option>
                  <option value='2022'>2022</option>
                  <option value='2023'>2023</option>
                  </Select>
  
            </DrawerBody>
  
            <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button style={{ backgroundColor: '#1c2c5b', color: 'white' }} onClick={() => {
              onClose();
              reset();
              }}>
              Reset
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  }


export default class ViewPerformanceEvaluation extends React.Component {

    
    // manually added the table
    state={
        content:null,
        headers:[],
        loading:true,
        settings: {},
        error: "",
        selectedOption1: "",
        selectedOption2: "",
        selectedOption3: "",
        selectedOption4: "",

        columnSettings: {
            FormID: {displayHeader: 'Form ID'},
            ServiceCenter: {displayHeader: 'Service Center'},
            Performance: {displayHeader: 'Performance'},
            Quarter: {displayHeader: 'Quarter'},
            Year: {displayHeader: 'Year'},
            DateTimeSubmitted: {displayHeader: 'DateTime Submitted'}
        },
        data: [
            {FormID: '83ec00e3-3b3e-4a56-b7c9', ServiceCenter: '2', Performance: 'Good', Quarter: 'Q1', Year: '2023', DateTimeSubmitted: '13/03/2023 08:45:23', AreaDoneWell: 'Completed all task on time.', AreaOfImprovement: 'Exceeded Budget', ExpenseOut: '$3000', DonationIn: '$500', ManHour: '30h', Progression: '40% - 45%'},
            {FormID: '83ec00e3-3b3e-4a56-b7c9', ServiceCenter: '3', Performance: 'Fair', Quarter: 'Q2', Year: '2021', DateTimeSubmitted: '14/03/2023 08:45:23', AreaDoneWell: 'Completed all task on time.', AreaOfImprovement: 'Exceeded Budget', ExpenseOut: '$3500', DonationIn: '$1500', ManHour: '33h', Progression: '50% - 55%'},
            {FormID: '83ec00e3-3b3e-4a56-b7c9', ServiceCenter: '5', Performance: 'Bad', Quarter: 'Q3', Year: '2022', DateTimeSubmitted: '15/03/2023 08:45:23', AreaDoneWell: 'Completed all task on time.', AreaOfImprovement: 'Exceeded Budget', ExpenseOut: '$4000', DonationIn: '$800', ManHour: '40h', Progression: '60% - 65%'},
            {FormID: '83ec00e3-3b3e-4a56-b7c9', ServiceCenter: '8', Performance: 'Good', Quarter: 'Q4', Year: '2023', DateTimeSubmitted: '16/03/2023 08:45:23', AreaDoneWell: 'Completed all task on time.', AreaOfImprovement: 'Exceeded Budget', ExpenseOut: '$4500', DonationIn: '$9200', ManHour: '130h', Progression: '90% - 95%'},
        ],
        fieldSettings: {
            FormID: {type: "text", displayLabel: "Form ID", editable: "false", primaryKey: "false", tooltip: "null"},
            ServiceCenter: {type: "text", displayLabel: "Service Center", editable: "false", primaryKey: "false", tooltip: "null"},
            Performance: {type: "text", displayLabel: "Performance", editable: "false", primaryKey: "false", tooltip: "null"},
            Quarter: {type: "text", displayLabel: "Quarter", editable: "false", primaryKey: "false", tooltip: "null"},
            Year: {type: "text", displayLabel: "Year", editable: "false", primaryKey: "false", tooltip: "null"},
            DateTimeSubmitted: {type: "text", displayLabel: "DateTime Submitted", editable: "false", primaryKey: "false", tooltip: "null"},
            AreaDoneWell: {type: "text", displayLabel: "Area Done Well: ", editable: "false", primaryKey: "false", tooltip: "null"},
            AreaOfImprovement: {type: "text", displayLabel: "Area of Improvement: ", editable: "false", primaryKey: "false", tooltip: "null"},
            ExpenseOut: {type: "text", displayLabel: "Expense Out: ", editable: "false", primaryKey: "false", tooltip: "null"},
            DonationIn: {type: "text", displayLabel: "Donation In: ", editable: "false", primaryKey: "false", tooltip: "null"},
            ManHour: {type: "text", displayLabel: "Man Hour: ", editable: "false", primaryKey: "false", tooltip: "null"},
            Progression: {type: "text", displayLabel: "Progression: ", editable: "false", primaryKey: "false", tooltip: "null"}
        }
    }

    
      handleOptionChange1 = (event) => {
        this.setState({ selectedOption1: event.target.value });
      };
      handleOptionChange2 = (event) => {
        this.setState({ selectedOption2: event.target.value });
      };
      handleOptionChange3 = (event) => {
        this.setState({ selectedOption3: event.target.value });
      };
      handleOptionChange4 = (event) => {
        this.setState({ selectedOption4: event.target.value });
      };

      renderTextbox = () => {
        const {activeButton, columnSettings, data, fieldSettings, selectedOption1, selectedOption2, selectedOption3, selectedOption4} = this.state
        if (this.state.loading)
        {
            return <loading></loading>
        }
        else
        {
            if (selectedOption1 == "sc2" && selectedOption2 == "" && selectedOption3 == "" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                  selectedOption1={this.state.selectedOption1}
                  onOptionChange1={this.handleOptionChange1}
                  selectedOption2={this.state.selectedOption2}
                  onOptionChange2={this.handleOptionChange2}
                  selectedOption3={this.state.selectedOptio3}
                  onOptionChange3={this.handleOptionChange3}
                  selectedOption4={this.state.selectedOption4}
                  onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>2</Box>
                                        <Box>Good</Box>
                                        <Box>Q1</Box>
                                        <Box>2023</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='2' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3000
    
                    <br/><br/>
    
                    Donation (In): $500
    
                    <br/><br/>
    
                    Man Hour: 30h
    
                    <br/><br/>
    
                    Progress: 40% - 45%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "Good" && selectedOption3 == "" && selectedOption4 == "") {
                return (
                <>
                <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                Filter By: 
                    <DrawerExample
                    style={{ position: 'absolute', right: 0 }}
                    selectedOption1={this.state.selectedOption1}
                    onOptionChange1={this.handleOptionChange1}
                    selectedOption2={this.state.selectedOption2}
                    onOptionChange2={this.handleOptionChange2}
                    selectedOption3={this.state.selectedOptio3}
                    onOptionChange3={this.handleOptionChange3}
                    selectedOption4={this.state.selectedOption4}
                    onOptionChange4={this.handleOptionChange4}
            />     
            </Heading>

                <DatapageLayoutEmpty 
                settings={this.settings}
                //fieldSettings={this.state.settings.data.FieldSettings} 
                requestRefresh = {this.requestRefresh}
                error={this.state.error}
                permissions={this.props.permissions}
                handleSearchCallBack={this.searchCallBack}>


                <Accordion allowToggle>
                    <AccordionItem>
                    <h2>
                    <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                        <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                            <SimpleGrid columns={6} spacing={0}>
                                <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                            </SimpleGrid>
                        </Box>
                    </AccordionButton>
                    </h2>
                    </AccordionItem>
                    
                    <AccordionItem>
                        <h2>
                        <AccordionButton style={{
                            backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                            color: activeButton === 'button1' ? 'white' : 'black',
                        }}
                        onClick={() => this.handleButtonClick('button1')}>
                            
                            
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                    <Box>2</Box>
                                    <Box>Good</Box>
                                    <Box>Q1</Box>
                                    <Box>2023</Box>
                                    <Box>13/03/2023 21:30:11</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                        
                        <SimpleGrid columns={2} spacing={20}>
            <Box height='500px'>
                Service Center
                <br/><br/>
                <Select placeholder='2' size='sm'>
                </Select>
                <br/><br/><br/>
                Performance
                <br/><br/>
                <Select placeholder='Good' size='sm'>
                </Select>
                <br/><br/><br/>
                Areas Done Well:
                <br/><br/>
                <Textarea placeholder="Completed all task on time" />
                <br/><br/><br/>
                Areas of Improve:
                <br/><br/>
                <Textarea placeholder="Exceeded Budget" />
            </Box>
            <Box height='500px'>
                
                <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>

                <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                Status
                </Heading>
                
                Expenses (Out): $3000

                <br/><br/>

                Donation (In): $500

                <br/><br/>

                Man Hour: 30h

                <br/><br/>

                Progress: 40% - 45%

                </div>
                
            
            </Box>
        </SimpleGrid>
                        
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                        <AccordionButton style={{
                            backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white',
                            color: activeButton === 'button2' ? 'white' : 'black',
                        }}
                        onClick={() => this.handleButtonClick('button2')}>
                            
                            
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                    <Box>8</Box>
                                    <Box>Good</Box>
                                    <Box>Q4</Box>
                                    <Box>2023</Box>
                                    <Box>16/03/2023 21:30:11</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                        
                        <SimpleGrid columns={2} spacing={20}>
            <Box height='500px'>
                Service Center
                <br/><br/>
                <Select placeholder='8' size='sm'>
                </Select>
                <br/><br/><br/>
                Performance
                <br/><br/>
                <Select placeholder='Good' size='sm'>
                </Select>
                <br/><br/><br/>
                Areas Done Well:
                <br/><br/>
                <Textarea placeholder="Completed all task on time" />
                <br/><br/><br/>
                Areas of Improve:
                <br/><br/>
                <Textarea placeholder="Exceeded Budget" />
            </Box>
            <Box height='500px'>
                
                <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>

                <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                Status
                </Heading>
                
                Expenses (Out): $4500

                <br/><br/>

                Donation (In): $9200

                <br/><br/>

                Man Hour: 130h

                <br/><br/>

                Progress: 90% - 95%

                </div>
                
            
            </Box>
        </SimpleGrid>
                        
                        </AccordionPanel>
                    </AccordionItem>
                    
                </Accordion>

        </DatapageLayoutEmpty>
                </>
            )
            } // two entries
            if (selectedOption1 == "" && selectedOption2 == "" && selectedOption3 == "Q1" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>2</Box>
                                        <Box>Good</Box>
                                        <Box>Q1</Box>
                                        <Box>2023</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='2' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3000
    
                    <br/><br/>
    
                    Donation (In): $500
    
                    <br/><br/>
    
                    Man Hour: 30h
    
                    <br/><br/>
    
                    Progress: 40% - 45%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "" && selectedOption3 == "" && selectedOption4 == "2023") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>2</Box>
                                        <Box>Good</Box>
                                        <Box>Q1</Box>
                                        <Box>2023</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='2' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3000
    
                    <br/><br/>
    
                    Donation (In): $500
    
                    <br/><br/>
    
                    Man Hour: 30h
    
                    <br/><br/>
    
                    Progress: 40% - 45%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button2' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button2')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>8</Box>
                                        <Box>Good</Box>
                                        <Box>Q4</Box>
                                        <Box>2023</Box>
                                        <Box>16/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='8' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4500
    
                    <br/><br/>
    
                    Donation (In): $9200
    
                    <br/><br/>
    
                    Man Hour: 130h
    
                    <br/><br/>
    
                    Progress: 90% - 95%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            } // two entries


            if (selectedOption1 == "sc2" && selectedOption2 == "Good" && selectedOption3 == "" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>2</Box>
                                        <Box>Good</Box>
                                        <Box>Q1</Box>
                                        <Box>2023</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='2' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3000
    
                    <br/><br/>
    
                    Donation (In): $500
    
                    <br/><br/>
    
                    Man Hour: 30h
    
                    <br/><br/>
    
                    Progress: 40% - 45%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "sc2" && selectedOption2 == "" && selectedOption3 == "Q1" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>2</Box>
                                        <Box>Good</Box>
                                        <Box>Q1</Box>
                                        <Box>2023</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='2' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3000
    
                    <br/><br/>
    
                    Donation (In): $500
    
                    <br/><br/>
    
                    Man Hour: 30h
    
                    <br/><br/>
    
                    Progress: 40% - 45%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button2' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button2')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>8</Box>
                                        <Box>Good</Box>
                                        <Box>Q4</Box>
                                        <Box>2023</Box>
                                        <Box>16/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='8' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4500
    
                    <br/><br/>
    
                    Donation (In): $9200
    
                    <br/><br/>
    
                    Man Hour: 130h
    
                    <br/><br/>
    
                    Progress: 90% - 95%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            } // two entries
            if (selectedOption1 == "sc2" && selectedOption2 == "" && selectedOption3 == "" && selectedOption4 == "2023") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>2</Box>
                                        <Box>Good</Box>
                                        <Box>Q1</Box>
                                        <Box>2023</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='2' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3000
    
                    <br/><br/>
    
                    Donation (In): $500
    
                    <br/><br/>
    
                    Man Hour: 30h
    
                    <br/><br/>
    
                    Progress: 40% - 45%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "Good" && selectedOption3 == "Q1" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>2</Box>
                                        <Box>Good</Box>
                                        <Box>Q1</Box>
                                        <Box>2023</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='2' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3000
    
                    <br/><br/>
    
                    Donation (In): $500
    
                    <br/><br/>
    
                    Man Hour: 30h
    
                    <br/><br/>
    
                    Progress: 40% - 45%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "Good" && selectedOption3 == "" && selectedOption4 == "2023") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>2</Box>
                                        <Box>Good</Box>
                                        <Box>Q1</Box>
                                        <Box>2023</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='2' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3000
    
                    <br/><br/>
    
                    Donation (In): $500
    
                    <br/><br/>
    
                    Man Hour: 30h
    
                    <br/><br/>
    
                    Progress: 40% - 45%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "" && selectedOption3 == "Q1" && selectedOption4 == "2023") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>2</Box>
                                        <Box>Good</Box>
                                        <Box>Q1</Box>
                                        <Box>2023</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='2' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3000
    
                    <br/><br/>
    
                    Donation (In): $500
    
                    <br/><br/>
    
                    Man Hour: 30h
    
                    <br/><br/>
    
                    Progress: 40% - 45%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }


            if (selectedOption1 == "sc2" && selectedOption2 == "Good" && selectedOption3 == "Q1" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>2</Box>
                                        <Box>Good</Box>
                                        <Box>Q1</Box>
                                        <Box>2023</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='2' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3000
    
                    <br/><br/>
    
                    Donation (In): $500
    
                    <br/><br/>
    
                    Man Hour: 30h
    
                    <br/><br/>
    
                    Progress: 40% - 45%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "sc2" && selectedOption2 == "Good" && selectedOption3 == "" && selectedOption4 == "2023") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>2</Box>
                                        <Box>Good</Box>
                                        <Box>Q1</Box>
                                        <Box>2023</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='2' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3000
    
                    <br/><br/>
    
                    Donation (In): $500
    
                    <br/><br/>
    
                    Man Hour: 30h
    
                    <br/><br/>
    
                    Progress: 40% - 45%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "sc2" && selectedOption2 == "" && selectedOption3 == "Q1" && selectedOption4 == "2023") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>2</Box>
                                        <Box>Good</Box>
                                        <Box>Q1</Box>
                                        <Box>2023</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='2' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3000
    
                    <br/><br/>
    
                    Donation (In): $500
    
                    <br/><br/>
    
                    Man Hour: 30h
    
                    <br/><br/>
    
                    Progress: 40% - 45%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "Good" && selectedOption3 == "Q1" && selectedOption4 == "2023") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>2</Box>
                                        <Box>Good</Box>
                                        <Box>Q1</Box>
                                        <Box>2023</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='2' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3000
    
                    <br/><br/>
    
                    Donation (In): $500
    
                    <br/><br/>
    
                    Man Hour: 30h
    
                    <br/><br/>
    
                    Progress: 40% - 45%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }


            if (selectedOption1 == "sc2" && selectedOption2 == "Good" && selectedOption3 == "Q1" && selectedOption4 == "2023") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>2</Box>
                                        <Box>Good</Box>
                                        <Box>Q1</Box>
                                        <Box>2023</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='2' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3000
    
                    <br/><br/>
    
                    Donation (In): $500
    
                    <br/><br/>
    
                    Man Hour: 30h
    
                    <br/><br/>
    
                    Progress: 40% - 45%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            if (selectedOption1 == "sc3" && selectedOption2 == "" && selectedOption3 == "" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>3</Box>
                                        <Box>Fair</Box>
                                        <Box>Q2</Box>
                                        <Box>2021</Box>
                                        <Box>14/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='3' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Fair' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3500
    
                    <br/><br/>
    
                    Donation (In): $1500
    
                    <br/><br/>
    
                    Man Hour: 33h
    
                    <br/><br/>
    
                    Progress: 50% - 55%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "Fair" && selectedOption3 == "" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>3</Box>
                                        <Box>Fair</Box>
                                        <Box>Q2</Box>
                                        <Box>2021</Box>
                                        <Box>14/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='3' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Fair' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3500
    
                    <br/><br/>
    
                    Donation (In): $1500
    
                    <br/><br/>
    
                    Man Hour: 33h
    
                    <br/><br/>
    
                    Progress: 50% - 55%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "" && selectedOption3 == "Q2" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>3</Box>
                                        <Box>Fair</Box>
                                        <Box>Q2</Box>
                                        <Box>2021</Box>
                                        <Box>14/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='3' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Fair' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3500
    
                    <br/><br/>
    
                    Donation (In): $1500
    
                    <br/><br/>
    
                    Man Hour: 33h
    
                    <br/><br/>
    
                    Progress: 50% - 55%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "" && selectedOption3 == "" && selectedOption4 == "2021") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>3</Box>
                                        <Box>Fair</Box>
                                        <Box>Q2</Box>
                                        <Box>2021</Box>
                                        <Box>14/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='3' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Fair' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3500
    
                    <br/><br/>
    
                    Donation (In): $1500
    
                    <br/><br/>
    
                    Man Hour: 33h
    
                    <br/><br/>
    
                    Progress: 50% - 55%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }


            if (selectedOption1 == "sc3" && selectedOption2 == "Fair" && selectedOption3 == "" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>3</Box>
                                        <Box>Fair</Box>
                                        <Box>Q2</Box>
                                        <Box>2021</Box>
                                        <Box>14/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='3' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Fair' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3500
    
                    <br/><br/>
    
                    Donation (In): $1500
    
                    <br/><br/>
    
                    Man Hour: 33h
    
                    <br/><br/>
    
                    Progress: 50% - 55%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "sc3" && selectedOption2 == "" && selectedOption3 == "Q2" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>3</Box>
                                        <Box>Fair</Box>
                                        <Box>Q2</Box>
                                        <Box>2021</Box>
                                        <Box>14/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='3' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Fair' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3500
    
                    <br/><br/>
    
                    Donation (In): $1500
    
                    <br/><br/>
    
                    Man Hour: 33h
    
                    <br/><br/>
    
                    Progress: 50% - 55%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "sc3" && selectedOption2 == "" && selectedOption3 == "" && selectedOption4 == "2021") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>3</Box>
                                        <Box>Fair</Box>
                                        <Box>Q2</Box>
                                        <Box>2021</Box>
                                        <Box>14/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='3' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Fair' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3500
    
                    <br/><br/>
    
                    Donation (In): $1500
    
                    <br/><br/>
    
                    Man Hour: 33h
    
                    <br/><br/>
    
                    Progress: 50% - 55%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "Fair" && selectedOption3 == "Q2" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>3</Box>
                                        <Box>Fair</Box>
                                        <Box>Q2</Box>
                                        <Box>2021</Box>
                                        <Box>14/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='3' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Fair' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3500
    
                    <br/><br/>
    
                    Donation (In): $1500
    
                    <br/><br/>
    
                    Man Hour: 33h
    
                    <br/><br/>
    
                    Progress: 50% - 55%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "Fair" && selectedOption3 == "" && selectedOption4 == "2021") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>3</Box>
                                        <Box>Fair</Box>
                                        <Box>Q2</Box>
                                        <Box>2021</Box>
                                        <Box>14/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='3' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Fair' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3500
    
                    <br/><br/>
    
                    Donation (In): $1500
    
                    <br/><br/>
    
                    Man Hour: 33h
    
                    <br/><br/>
    
                    Progress: 50% - 55%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "" && selectedOption3 == "Q2" && selectedOption4 == "2021") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>3</Box>
                                        <Box>Fair</Box>
                                        <Box>Q2</Box>
                                        <Box>2021</Box>
                                        <Box>14/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='3' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Fair' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3500
    
                    <br/><br/>
    
                    Donation (In): $1500
    
                    <br/><br/>
    
                    Man Hour: 33h
    
                    <br/><br/>
    
                    Progress: 50% - 55%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )            
            }


            if (selectedOption1 == "sc3" && selectedOption2 == "Fair" && selectedOption3 == "Q2" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>3</Box>
                                        <Box>Fair</Box>
                                        <Box>Q2</Box>
                                        <Box>2021</Box>
                                        <Box>14/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='3' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Fair' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3500
    
                    <br/><br/>
    
                    Donation (In): $1500
    
                    <br/><br/>
    
                    Man Hour: 33h
    
                    <br/><br/>
    
                    Progress: 50% - 55%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "sc3" && selectedOption2 == "Fair" && selectedOption3 == "" && selectedOption4 == "2021") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>3</Box>
                                        <Box>Fair</Box>
                                        <Box>Q2</Box>
                                        <Box>2021</Box>
                                        <Box>14/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='3' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Fair' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3500
    
                    <br/><br/>
    
                    Donation (In): $1500
    
                    <br/><br/>
    
                    Man Hour: 33h
    
                    <br/><br/>
    
                    Progress: 50% - 55%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "sc3" && selectedOption2 == "" && selectedOption3 == "Q2" && selectedOption4 == "2021") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>3</Box>
                                        <Box>Fair</Box>
                                        <Box>Q2</Box>
                                        <Box>2021</Box>
                                        <Box>14/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='3' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Fair' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3500
    
                    <br/><br/>
    
                    Donation (In): $1500
    
                    <br/><br/>
    
                    Man Hour: 33h
    
                    <br/><br/>
    
                    Progress: 50% - 55%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "Fair" && selectedOption3 == "Q2" && selectedOption4 == "2021") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>3</Box>
                                        <Box>Fair</Box>
                                        <Box>Q2</Box>
                                        <Box>2021</Box>
                                        <Box>14/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='3' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Fair' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3500
    
                    <br/><br/>
    
                    Donation (In): $1500
    
                    <br/><br/>
    
                    Man Hour: 33h
    
                    <br/><br/>
    
                    Progress: 50% - 55%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }


            if (selectedOption1 == "sc3" && selectedOption2 == "Fair" && selectedOption3 == "Q2" && selectedOption4 == "2021") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>3</Box>
                                        <Box>Fair</Box>
                                        <Box>Q2</Box>
                                        <Box>2021</Box>
                                        <Box>14/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='3' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Fair' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $3500
    
                    <br/><br/>
    
                    Donation (In): $1500
    
                    <br/><br/>
    
                    Man Hour: 33h
    
                    <br/><br/>
    
                    Progress: 50% - 55%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            if (selectedOption1 == "sc5" && selectedOption2 == "" && selectedOption3 == "" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>5</Box>
                                        <Box>Bad</Box>
                                        <Box>Q3</Box>
                                        <Box>2022</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='5' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Bad' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4000
    
                    <br/><br/>
    
                    Donation (In): $800
    
                    <br/><br/>
    
                    Man Hour: 40h
    
                    <br/><br/>
    
                    Progress: 60% - 65%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "Bad" && selectedOption3 == "" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>5</Box>
                                        <Box>Bad</Box>
                                        <Box>Q3</Box>
                                        <Box>2022</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='5' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Bad' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4000
    
                    <br/><br/>
    
                    Donation (In): $800
    
                    <br/><br/>
    
                    Man Hour: 40h
    
                    <br/><br/>
    
                    Progress: 60% - 65%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "" && selectedOption3 == "Q3" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>5</Box>
                                        <Box>Bad</Box>
                                        <Box>Q3</Box>
                                        <Box>2022</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='5' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Bad' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4000
    
                    <br/><br/>
    
                    Donation (In): $800
    
                    <br/><br/>
    
                    Man Hour: 40h
    
                    <br/><br/>
    
                    Progress: 60% - 65%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "" && selectedOption3 == "" && selectedOption4 == "2022") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>5</Box>
                                        <Box>Bad</Box>
                                        <Box>Q3</Box>
                                        <Box>2022</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='5' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Bad' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4000
    
                    <br/><br/>
    
                    Donation (In): $800
    
                    <br/><br/>
    
                    Man Hour: 40h
    
                    <br/><br/>
    
                    Progress: 60% - 65%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }


            if (selectedOption1 == "sc5" && selectedOption2 == "Bad" && selectedOption3 == "" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>5</Box>
                                        <Box>Bad</Box>
                                        <Box>Q3</Box>
                                        <Box>2022</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='5' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Bad' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4000
    
                    <br/><br/>
    
                    Donation (In): $800
    
                    <br/><br/>
    
                    Man Hour: 40h
    
                    <br/><br/>
    
                    Progress: 60% - 65%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "sc5" && selectedOption2 == "" && selectedOption3 == "Q3" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>5</Box>
                                        <Box>Bad</Box>
                                        <Box>Q3</Box>
                                        <Box>2022</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='5' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Bad' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4000
    
                    <br/><br/>
    
                    Donation (In): $800
    
                    <br/><br/>
    
                    Man Hour: 40h
    
                    <br/><br/>
    
                    Progress: 60% - 65%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "sc5" && selectedOption2 == "" && selectedOption3 == "" && selectedOption4 == "2022") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>5</Box>
                                        <Box>Bad</Box>
                                        <Box>Q3</Box>
                                        <Box>2022</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='5' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Bad' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4000
    
                    <br/><br/>
    
                    Donation (In): $800
    
                    <br/><br/>
    
                    Man Hour: 40h
    
                    <br/><br/>
    
                    Progress: 60% - 65%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "Bad" && selectedOption3 == "Q3" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>5</Box>
                                        <Box>Bad</Box>
                                        <Box>Q3</Box>
                                        <Box>2022</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='5' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Bad' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4000
    
                    <br/><br/>
    
                    Donation (In): $800
    
                    <br/><br/>
    
                    Man Hour: 40h
    
                    <br/><br/>
    
                    Progress: 60% - 65%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "Bad" && selectedOption3 == "" && selectedOption4 == "2022") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>5</Box>
                                        <Box>Bad</Box>
                                        <Box>Q3</Box>
                                        <Box>2022</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='5' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Bad' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4000
    
                    <br/><br/>
    
                    Donation (In): $800
    
                    <br/><br/>
    
                    Man Hour: 40h
    
                    <br/><br/>
    
                    Progress: 60% - 65%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "" && selectedOption3 == "Q3" && selectedOption4 == "2022") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>5</Box>
                                        <Box>Bad</Box>
                                        <Box>Q3</Box>
                                        <Box>2022</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='5' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Bad' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4000
    
                    <br/><br/>
    
                    Donation (In): $800
    
                    <br/><br/>
    
                    Man Hour: 40h
    
                    <br/><br/>
    
                    Progress: 60% - 65%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }


            if (selectedOption1 == "sc5" && selectedOption2 == "Bad" && selectedOption3 == "Q3" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>5</Box>
                                        <Box>Bad</Box>
                                        <Box>Q3</Box>
                                        <Box>2022</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='5' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Bad' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4000
    
                    <br/><br/>
    
                    Donation (In): $800
    
                    <br/><br/>
    
                    Man Hour: 40h
    
                    <br/><br/>
    
                    Progress: 60% - 65%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "sc5" && selectedOption2 == "Bad" && selectedOption3 == "" && selectedOption4 == "2022") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>5</Box>
                                        <Box>Bad</Box>
                                        <Box>Q3</Box>
                                        <Box>2022</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='5' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Bad' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4000
    
                    <br/><br/>
    
                    Donation (In): $800
    
                    <br/><br/>
    
                    Man Hour: 40h
    
                    <br/><br/>
    
                    Progress: 60% - 65%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "sc5" && selectedOption2 == "" && selectedOption3 == "Q3" && selectedOption4 == "2022") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>5</Box>
                                        <Box>Bad</Box>
                                        <Box>Q3</Box>
                                        <Box>2022</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='5' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Bad' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4000
    
                    <br/><br/>
    
                    Donation (In): $800
    
                    <br/><br/>
    
                    Man Hour: 40h
    
                    <br/><br/>
    
                    Progress: 60% - 65%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "Bad" && selectedOption3 == "Q3" && selectedOption4 == "2022") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>5</Box>
                                        <Box>Bad</Box>
                                        <Box>Q3</Box>
                                        <Box>2022</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='5' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Bad' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4000
    
                    <br/><br/>
    
                    Donation (In): $800
    
                    <br/><br/>
    
                    Man Hour: 40h
    
                    <br/><br/>
    
                    Progress: 60% - 65%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }


            if (selectedOption1 == "sc5" && selectedOption2 == "Bad" && selectedOption3 == "Q3" && selectedOption4 == "2022") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button1' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button1')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button1' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>5</Box>
                                        <Box>Bad</Box>
                                        <Box>Q3</Box>
                                        <Box>2022</Box>
                                        <Box>13/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='5' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Bad' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4000
    
                    <br/><br/>
    
                    Donation (In): $800
    
                    <br/><br/>
    
                    Man Hour: 40h
    
                    <br/><br/>
    
                    Progress: 60% - 65%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
    
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            if (selectedOption1 == "sc8" && selectedOption2 == "" && selectedOption3 == "" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button2' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button2')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>8</Box>
                                        <Box>Good</Box>
                                        <Box>Q4</Box>
                                        <Box>2023</Box>
                                        <Box>16/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='8' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4500
    
                    <br/><br/>
    
                    Donation (In): $9200
    
                    <br/><br/>
    
                    Man Hour: 130h
    
                    <br/><br/>
    
                    Progress: 90% - 95%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            // if (selectedOption1 == "" && selectedOption2 == "Good" && selectedOption3 == "" && selectedOption4 == "") {
            // }
            if (selectedOption1 == "" && selectedOption2 == "" && selectedOption3 == "Q4" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button2' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button2')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>8</Box>
                                        <Box>Good</Box>
                                        <Box>Q4</Box>
                                        <Box>2023</Box>
                                        <Box>16/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='8' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4500
    
                    <br/><br/>
    
                    Donation (In): $9200
    
                    <br/><br/>
    
                    Man Hour: 130h
    
                    <br/><br/>
    
                    Progress: 90% - 95%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            // if (selectedOption1 == "" && selectedOption2 == "" && selectedOption3 == "" && selectedOption4 == "2023") {
            // }


            if (selectedOption1 == "sc8" && selectedOption2 == "Good" && selectedOption3 == "" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button2' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button2')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>8</Box>
                                        <Box>Good</Box>
                                        <Box>Q4</Box>
                                        <Box>2023</Box>
                                        <Box>16/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='8' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4500
    
                    <br/><br/>
    
                    Donation (In): $9200
    
                    <br/><br/>
    
                    Man Hour: 130h
    
                    <br/><br/>
    
                    Progress: 90% - 95%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "sc8" && selectedOption2 == "" && selectedOption3 == "Q4" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button2' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button2')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>8</Box>
                                        <Box>Good</Box>
                                        <Box>Q4</Box>
                                        <Box>2023</Box>
                                        <Box>16/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='8' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4500
    
                    <br/><br/>
    
                    Donation (In): $9200
    
                    <br/><br/>
    
                    Man Hour: 130h
    
                    <br/><br/>
    
                    Progress: 90% - 95%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "sc8" && selectedOption2 == "" && selectedOption3 == "" && selectedOption4 == "2023") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button2' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button2')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>8</Box>
                                        <Box>Good</Box>
                                        <Box>Q4</Box>
                                        <Box>2023</Box>
                                        <Box>16/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='8' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4500
    
                    <br/><br/>
    
                    Donation (In): $9200
    
                    <br/><br/>
    
                    Man Hour: 130h
    
                    <br/><br/>
    
                    Progress: 90% - 95%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "Good" && selectedOption3 == "Q4" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button2' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button2')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>8</Box>
                                        <Box>Good</Box>
                                        <Box>Q4</Box>
                                        <Box>2023</Box>
                                        <Box>16/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='8' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4500
    
                    <br/><br/>
    
                    Donation (In): $9200
    
                    <br/><br/>
    
                    Man Hour: 130h
    
                    <br/><br/>
    
                    Progress: 90% - 95%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            // if (selectedOption1 == "" && selectedOption2 == "Good" && selectedOption3 == "" && selectedOption4 == "2023") {
            // }
            if (selectedOption1 == "" && selectedOption2 == "" && selectedOption3 == "Q4" && selectedOption4 == "2023") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button2' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button2')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>8</Box>
                                        <Box>Good</Box>
                                        <Box>Q4</Box>
                                        <Box>2023</Box>
                                        <Box>16/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='8' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4500
    
                    <br/><br/>
    
                    Donation (In): $9200
    
                    <br/><br/>
    
                    Man Hour: 130h
    
                    <br/><br/>
    
                    Progress: 90% - 95%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }


            if (selectedOption1 == "sc8" && selectedOption2 == "Good" && selectedOption3 == "Q4" && selectedOption4 == "") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button2' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button2')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>8</Box>
                                        <Box>Good</Box>
                                        <Box>Q4</Box>
                                        <Box>2023</Box>
                                        <Box>16/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='8' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4500
    
                    <br/><br/>
    
                    Donation (In): $9200
    
                    <br/><br/>
    
                    Man Hour: 130h
    
                    <br/><br/>
    
                    Progress: 90% - 95%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "sc8" && selectedOption2 == "Good" && selectedOption3 == "" && selectedOption4 == "2023") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button2' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button2')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>8</Box>
                                        <Box>Good</Box>
                                        <Box>Q4</Box>
                                        <Box>2023</Box>
                                        <Box>16/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='8' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4500
    
                    <br/><br/>
    
                    Donation (In): $9200
    
                    <br/><br/>
    
                    Man Hour: 130h
    
                    <br/><br/>
    
                    Progress: 90% - 95%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "sc8" && selectedOption2 == "" && selectedOption3 == "Q4" && selectedOption4 == "2023") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button2' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button2')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>8</Box>
                                        <Box>Good</Box>
                                        <Box>Q4</Box>
                                        <Box>2023</Box>
                                        <Box>16/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='8' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4500
    
                    <br/><br/>
    
                    Donation (In): $9200
    
                    <br/><br/>
    
                    Man Hour: 130h
    
                    <br/><br/>
    
                    Progress: 90% - 95%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }
            if (selectedOption1 == "" && selectedOption2 == "Good" && selectedOption3 == "Q4" && selectedOption4 == "2023") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button2' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button2')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>8</Box>
                                        <Box>Good</Box>
                                        <Box>Q4</Box>
                                        <Box>2023</Box>
                                        <Box>16/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='8' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4500
    
                    <br/><br/>
    
                    Donation (In): $9200
    
                    <br/><br/>
    
                    Man Hour: 130h
    
                    <br/><br/>
    
                    Progress: 90% - 95%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }


            if (selectedOption1 == "sc8" && selectedOption2 == "Good" && selectedOption3 == "Q4" && selectedOption4 == "2023") {
                return (
                    <>
                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Filter By: 
                        <DrawerExample
                        style={{ position: 'absolute', right: 0 }}
                        selectedOption1={this.state.selectedOption1}
                        onOptionChange1={this.handleOptionChange1}
                        selectedOption2={this.state.selectedOption2}
                        onOptionChange2={this.handleOptionChange2}
                        selectedOption3={this.state.selectedOptio3}
                        onOptionChange3={this.handleOptionChange3}
                        selectedOption4={this.state.selectedOption4}
                        onOptionChange4={this.handleOptionChange4}
                />     
                </Heading>
    
                    <DatapageLayoutEmpty 
                    settings={this.settings}
                    //fieldSettings={this.state.settings.data.FieldSettings} 
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    handleSearchCallBack={this.searchCallBack}>
    
    
                    <Accordion allowToggle>
                        <AccordionItem>
                        <h2>
                        <AccordionButton style={{ backgroundColor: '#E8E8E8'}}>
                            <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', textColor: 'black', fontWeight: 'bold' , backgroundColor: '#E8E8E8' }}>
                                <SimpleGrid columns={6} spacing={0}>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Form ID</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Center</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Performance</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Quarter</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Year</Box>
                                    <Box style={{textColor: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Datetime submitted</Box>
                                </SimpleGrid>
                            </Box>
                        </AccordionButton>
                        </h2>
                        </AccordionItem>
                        
                        <AccordionItem>
                            <h2>
                            <AccordionButton style={{
                                backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white',
                                color: activeButton === 'button2' ? 'white' : 'black',
                            }}
                            onClick={() => this.handleButtonClick('button2')}>
                                
                                
                                <Box as="span" flex='1' textAlign='left' style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: activeButton === 'button2' ? '#1c2c5b' : 'white' }}>
                                    <SimpleGrid columns={6} spacing={0}>
                                        <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                                        <Box>8</Box>
                                        <Box>Good</Box>
                                        <Box>Q4</Box>
                                        <Box>2023</Box>
                                        <Box>16/03/2023 21:30:11</Box>
                                    </SimpleGrid>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel style={{ backgroundColor: 'white' , padding: '20px', border: '1px solid #E8E8E8' }}>
                            
                            <SimpleGrid columns={2} spacing={20}>
                <Box height='500px'>
                    Service Center
                    <br/><br/>
                    <Select placeholder='8' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Performance
                    <br/><br/>
                    <Select placeholder='Good' size='sm'>
                    </Select>
                    <br/><br/><br/>
                    Areas Done Well:
                    <br/><br/>
                    <Textarea placeholder="Completed all task on time" />
                    <br/><br/><br/>
                    Areas of Improve:
                    <br/><br/>
                    <Textarea placeholder="Exceeded Budget" />
                </Box>
                <Box height='500px'>
                    
                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>
    
                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                    Status
                    </Heading>
                    
                    Expenses (Out): $4500
    
                    <br/><br/>
    
                    Donation (In): $9200
    
                    <br/><br/>
    
                    Man Hour: 130h
    
                    <br/><br/>
    
                    Progress: 90% - 95%
    
                    </div>
                    
                
                </Box>
            </SimpleGrid>
                            
                            </AccordionPanel>
                        </AccordionItem>
                        
                    </Accordion>
    
            </DatapageLayoutEmpty>
                    </>
                )
            }

            if (selectedOption1 == "" && selectedOption2 == "" && selectedOption3 == "" && selectedOption4 == "") {
                return (
                    <>
                    

                    <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                            Filter By: 
                                <DrawerExample
                                style={{ position: 'absolute', right: 0 }}
                                selectedOption1={this.state.selectedOption1}
                                onOptionChange1={this.handleOptionChange1}
                                selectedOption2={this.state.selectedOption2}
                                onOptionChange2={this.handleOptionChange2}
                                selectedOption3={this.state.selectedOptio3}
                                onOptionChange3={this.handleOptionChange3}
                                selectedOption4={this.state.selectedOption4}
                                onOptionChange4={this.handleOptionChange4}
                        />     
                        </Heading>

                    <DatapageLayout 
                    settings={this.settings}
                    fieldSettings={fieldSettings} 
                    headers={columnSettings} 
                    data={data}
                    hasFields = {false}

                    updateHandle = {this.handleUpdate}
                    requestRefresh = {this.requestRefresh}
                    error={this.state.error}
                    permissions={this.props.permissions}
                    requestError={this.requestError}
                    >       

            

                    {this.state.content.data.map((item, index) => {


                        return(

                            

                            <div className="volunteer-extended">
                                
                                <SimpleGrid columns={2} spacing={20}>
                                <Box height='500px'>

                                
                                        <b>Service Center:</b>
                                        <br/><br/>
                                        <Select placeholder={data[index].ServiceCenter} size='sm'>
                                        </Select>
                                        <br/><br/><br/>
                                        <b>Performance:</b>
                                        <br/><br/>
                                        <Select placeholder={data[index].Performance} size='sm'>
                                        </Select>
                                        <br/><br/><br/>
                                        <b>Areas Done Well:</b>
                                        <br/><br/>
                                        <Textarea placeholder={data[index].AreaDoneWell} />
                                        <br/><br/><br/>
                                        <b>Areas of Improve:</b>
                                        <br/><br/>
                                        <Textarea placeholder={data[index].AreaOfImprovement} />
                                    
                                </Box>
                                <Box height='500px'>
                                    
                                    <div style={{ backgroundColor: 'white' , border: '1px solid grey', padding: '20px' }}>

                                    <Heading as="h6" size="md" style={{ marginTop: '10px', marginBottom: '20px' }}>
                                    Status
                                    </Heading>
                                    
                                    Expenses (Out): {data[index].ExpenseOut}

                                    <br/><br/>

                                    Donation (In): {data[index].DonationIn}

                                    <br/><br/>

                                    Man Hour: {data[index].ManHour}

                                    <br/><br/>

                                    Progress: {data[index].Progression}

                                    </div>
                                    <br/><br/><br/><br/>
                                </Box>
                            </SimpleGrid>

                            
                            </div>
                        )
                    })}

                    </DatapageLayout>
                    
                    </>
                )
            } else {
                if (selectedOption1 == "sc1" && selectedOption2 == "") {
                    return (
                        <>
                        <br/><br/>
                        <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                        Filter By: 
                            <DrawerExample
                            style={{ position: 'absolute', right: 0 }}
                            selectedOption1={this.state.selectedOption1}
                            onOptionChange1={this.handleOptionChange1}
                            selectedOption2={this.state.selectedOption2}
                            onOptionChange2={this.handleOptionChange2}
                            selectedOption3={this.state.selectedOptio3}
                            onOptionChange3={this.handleOptionChange3}
                            selectedOption4={this.state.selectedOption4}
                            onOptionChange4={this.handleOptionChange4}
                    />     
                    </Heading>
        
                    <br/><br/>
                    <Text>You have not filled out any Performance Evaluation Form yet, please click the button below to fill in the form.</Text>
                    <br/><br/>
                        <Link to="/Feedback">
                            <Button style={{ backgroundColor: '#1c2c5b', color: 'white' }}>Click Here</Button>
                        </Link>
                        </>
                    )
                } else if (selectedOption1 == "sc4" && selectedOption2 == "") {
                    return (
                        <>
                        <br/><br/>
                        <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                        Filter By: 
                            <DrawerExample
                            style={{ position: 'absolute', right: 0 }}
                            selectedOption1={this.state.selectedOption1}
                            onOptionChange1={this.handleOptionChange1}
                            selectedOption2={this.state.selectedOption2}
                            onOptionChange2={this.handleOptionChange2}
                            selectedOption3={this.state.selectedOptio3}
                            onOptionChange3={this.handleOptionChange3}
                            selectedOption4={this.state.selectedOption4}
                            onOptionChange4={this.handleOptionChange4}
                    />     
                    </Heading>
        
                    <br/><br/>
                    <Text>You have not filled out any Performance Evaluation Form yet, please click the button below to fill in the form.</Text>
                    <br/><br/>
                        <Link to="/Feedback">
                            <Button style={{ backgroundColor: '#1c2c5b', color: 'white' }}>Click Here</Button>
                        </Link>
                        </>
                    )
                } else if (selectedOption1 == "sc6" && selectedOption2 == "") {
                    return (
                        <>
                        <br/><br/>
                        <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                        Filter By: 
                            <DrawerExample
                            style={{ position: 'absolute', right: 0 }}
                            selectedOption1={this.state.selectedOption1}
                            onOptionChange1={this.handleOptionChange1}
                            selectedOption2={this.state.selectedOption2}
                            onOptionChange2={this.handleOptionChange2}
                            selectedOption3={this.state.selectedOptio3}
                            onOptionChange3={this.handleOptionChange3}
                            selectedOption4={this.state.selectedOption4}
                            onOptionChange4={this.handleOptionChange4}
                    />     
                    </Heading>
        
                    <br/><br/>
                    <Text>You have not filled out any Performance Evaluation Form yet, please click the button below to fill in the form.</Text>
                    <br/><br/>
                        <Link to="/Feedback">
                            <Button style={{ backgroundColor: '#1c2c5b', color: 'white' }}>Click Here</Button>
                        </Link>
                        </>
                    )
                } else if (selectedOption1 == "sc7" && selectedOption2 == "") {
                    return (
                        <>
                        <br/><br/>
                        <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                        Filter By: 
                            <DrawerExample
                            style={{ position: 'absolute', right: 0 }}
                            selectedOption1={this.state.selectedOption1}
                            onOptionChange1={this.handleOptionChange1}
                            selectedOption2={this.state.selectedOption2}
                            onOptionChange2={this.handleOptionChange2}
                            selectedOption3={this.state.selectedOptio3}
                            onOptionChange3={this.handleOptionChange3}
                            selectedOption4={this.state.selectedOption4}
                            onOptionChange4={this.handleOptionChange4}
                    />     
                    </Heading>
        
                    <br/><br/>
                    <Text>You have not filled out any Performance Evaluation Form yet, please click the button below to fill in the form.</Text>
                    <br/><br/>
                        <Link to="/ViewFeedback">
                            <Button style={{ backgroundColor: '#1c2c5b', color: 'white' }}>Click Here</Button>
                        </Link>
                        </>
                    ) 
                } else if (selectedOption1 == "" && selectedOption2 == "Excellent") {
                    return (
                        <>
                        <br/><br/>
                        <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                        Filter By: 
                            <DrawerExample
                            style={{ position: 'absolute', right: 0 }}
                            selectedOption1={this.state.selectedOption1}
                            onOptionChange1={this.handleOptionChange1}
                            selectedOption2={this.state.selectedOption2}
                            onOptionChange2={this.handleOptionChange2}
                            selectedOption3={this.state.selectedOptio3}
                            onOptionChange3={this.handleOptionChange3}
                            selectedOption4={this.state.selectedOption4}
                            onOptionChange4={this.handleOptionChange4}
                    />     
                    </Heading>
        
                    <br/><br/>
                    <Text>There is no Excellent Performance Level for any Service Center yet.</Text>
                    
                        </>
                    )
                } else if (selectedOption1 == "" && selectedOption2 == "Poor") {
                    return (
                        <>
                        <br/><br/>
                        <Text>Excellent: Nothing</Text>
                        <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                        Filter By: 
                            <DrawerExample
                            style={{ position: 'absolute', right: 0 }}
                            selectedOption1={this.state.selectedOption1}
                            onOptionChange1={this.handleOptionChange1}
                            selectedOption2={this.state.selectedOption2}
                            onOptionChange2={this.handleOptionChange2}
                            selectedOption3={this.state.selectedOptio3}
                            onOptionChange3={this.handleOptionChange3}
                            selectedOption4={this.state.selectedOption4}
                            onOptionChange4={this.handleOptionChange4}
                    />     
                    </Heading>
        
                    <br/><br/>
                    <Text>There is no Poor Performance Level for any Service Center yet.</Text>
                        </>
                    )
                } else if (selectedOption1 == "sc1" && selectedOption2 == "Excellent") {
                    return (
                        <>
                        <br/><br/>
                        <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                        Filter By: 
                            <DrawerExample
                            style={{ position: 'absolute', right: 0 }}
                            selectedOption1={this.state.selectedOption1}
                            onOptionChange1={this.handleOptionChange1}
                            selectedOption2={this.state.selectedOption2}
                            onOptionChange2={this.handleOptionChange2}
                            selectedOption3={this.state.selectedOptio3}
                            onOptionChange3={this.handleOptionChange3}
                            selectedOption4={this.state.selectedOption4}
                            onOptionChange4={this.handleOptionChange4}
                    />     
                    </Heading>
        
                    <br/><br/>
                    <Text>There is no Excellent Performance Level for any Service Center yet.</Text>
                    <br/><br/>
                    <Text>You have not filled out any Performance Evaluation Form yet, please click the button below to fill in the form.</Text>
                    <br/><br/>
                        <Link to="/Feedback">
                            <Button style={{ backgroundColor: '#1c2c5b', color: 'white' }}>Click Here</Button>
                        </Link>
                        </>
                    )
                } else if (selectedOption1 == "sc4" && selectedOption2 == "Excellent") {
                    return (
                        <>
                        <br/><br/>
                        <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                        Filter By: 
                            <DrawerExample
                            style={{ position: 'absolute', right: 0 }}
                            selectedOption1={this.state.selectedOption1}
                            onOptionChange1={this.handleOptionChange1}
                            selectedOption2={this.state.selectedOption2}
                            onOptionChange2={this.handleOptionChange2}
                            selectedOption3={this.state.selectedOptio3}
                            onOptionChange3={this.handleOptionChange3}
                            selectedOption4={this.state.selectedOption4}
                            onOptionChange4={this.handleOptionChange4}
                    />     
                    </Heading>
        
                    <br/><br/>
                    <Text>There is no Excellent Performance Level for any Service Center yet.</Text>
                    <br/><br/>
                    <Text>You have not filled out any Performance Evaluation Form yet, please click the button below to fill in the form.</Text>
                    <br/><br/>
                        <Link to="/Feedback">
                            <Button style={{ backgroundColor: '#1c2c5b', color: 'white' }}>Click Here</Button>
                        </Link>
                        </>
                    )
                } else if (selectedOption1 == "sc6" && selectedOption2 == "Excellent") {
                    return (
                        <>
                        <br/><br/>
                        <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                        Filter By: 
                            <DrawerExample
                            style={{ position: 'absolute', right: 0 }}
                            selectedOption1={this.state.selectedOption1}
                            onOptionChange1={this.handleOptionChange1}
                            selectedOption2={this.state.selectedOption2}
                            onOptionChange2={this.handleOptionChange2}
                            selectedOption3={this.state.selectedOptio3}
                            onOptionChange3={this.handleOptionChange3}
                            selectedOption4={this.state.selectedOption4}
                            onOptionChange4={this.handleOptionChange4}
                    />     
                    </Heading>
        
                    <br/><br/>
                    <Text>There is no Excellent Performance Level for any Service Center yet.</Text>
                    <br/><br/>
                    <Text>You have not filled out any Performance Evaluation Form yet, please click the button below to fill in the form.</Text>
                    <br/><br/>
                        <Link to="/Feedback">
                            <Button style={{ backgroundColor: '#1c2c5b', color: 'white' }}>Click Here</Button>
                        </Link>
                        </>
                    )
                } else if (selectedOption1 == "sc7" && selectedOption2 == "Excellent") {
                    return (
                        <>
                        <br/><br/>
                        <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                        Filter By: 
                            <DrawerExample
                            style={{ position: 'absolute', right: 0 }}
                            selectedOption1={this.state.selectedOption1}
                            onOptionChange1={this.handleOptionChange1}
                            selectedOption2={this.state.selectedOption2}
                            onOptionChange2={this.handleOptionChange2}
                            selectedOption3={this.state.selectedOptio3}
                            onOptionChange3={this.handleOptionChange3}
                            selectedOption4={this.state.selectedOption4}
                            onOptionChange4={this.handleOptionChange4}
                    />     
                    </Heading>
        
                    <br/><br/>
                    <Text>There is no Excellent Performance Level for any Service Center yet.</Text>
                    <br/><br/>
                    <Text>You have not filled out any Performance Evaluation Form yet, please click the button below to fill in the form.</Text>
                    <br/><br/>
                        <Link to="/Feedback">
                            <Button style={{ backgroundColor: '#1c2c5b', color: 'white' }}>Click Here</Button>
                        </Link>
                        </>
                    )
                } else if (selectedOption1 == "sc1" && selectedOption2 == "Poor") {
                    return (
                        <>
                        <br/><br/>
                        <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                        Filter By: 
                            <DrawerExample
                            style={{ position: 'absolute', right: 0 }}
                            selectedOption1={this.state.selectedOption1}
                            onOptionChange1={this.handleOptionChange1}
                            selectedOption2={this.state.selectedOption2}
                            onOptionChange2={this.handleOptionChange2}
                            selectedOption3={this.state.selectedOptio3}
                            onOptionChange3={this.handleOptionChange3}
                            selectedOption4={this.state.selectedOption4}
                            onOptionChange4={this.handleOptionChange4}
                    />     
                    </Heading>
        
                    <br/><br/>
                    <Text>There is no Poor Performance Level for any Service Center yet.</Text>
                    <br/><br/>
                    <Text>You have not filled out any Performance Evaluation Form yet, please click the button below to fill in the form.</Text>
                    <br/><br/>
                        <Link to="/Feedback">
                            <Button style={{ backgroundColor: '#1c2c5b', color: 'white' }}>Click Here</Button>
                        </Link>
                        </>
                    )
                } else if (selectedOption1 == "sc4" && selectedOption2 == "Poor") {
                    return (
                        <>
                        <br/><br/>
                        <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                        Filter By: 
                            <DrawerExample
                            style={{ position: 'absolute', right: 0 }}
                            selectedOption1={this.state.selectedOption1}
                            onOptionChange1={this.handleOptionChange1}
                            selectedOption2={this.state.selectedOption2}
                            onOptionChange2={this.handleOptionChange2}
                            selectedOption3={this.state.selectedOptio3}
                            onOptionChange3={this.handleOptionChange3}
                            selectedOption4={this.state.selectedOption4}
                            onOptionChange4={this.handleOptionChange4}
                    />     
                    </Heading>
        
                    <br/><br/>
                    <Text>There is no Poor Performance Level for any Service Center yet.</Text>
                    <br/><br/>
                    <Text>You have not filled out any Performance Evaluation Form yet, please click the button below to fill in the form.</Text>
                    <br/><br/>
                        <Link to="/Feedback">
                            <Button style={{ backgroundColor: '#1c2c5b', color: 'white' }}>Click Here</Button>
                        </Link>
                        </>
                    )
                } else if (selectedOption1 == "sc6" && selectedOption2 == "Poor") {
                    return (
                        <>
                        <br/><br/>
                        <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                        Filter By: 
                            <DrawerExample
                            style={{ position: 'absolute', right: 0 }}
                            selectedOption1={this.state.selectedOption1}
                            onOptionChange1={this.handleOptionChange1}
                            selectedOption2={this.state.selectedOption2}
                            onOptionChange2={this.handleOptionChange2}
                            selectedOption3={this.state.selectedOptio3}
                            onOptionChange3={this.handleOptionChange3}
                            selectedOption4={this.state.selectedOption4}
                            onOptionChange4={this.handleOptionChange4}
                    />     
                    </Heading>
        
                    <br/><br/>
                    <Text>There is no Poor Performance Level for any Service Center yet.</Text>
                    <br/><br/>
                    <Text>You have not filled out any Performance Evaluation Form yet, please click the button below to fill in the form.</Text>
                    <br/><br/>
                        <Link to="/Feedback">
                            <Button style={{ backgroundColor: '#1c2c5b', color: 'white' }}>Click Here</Button>
                        </Link>
                        </>
                    )
                } else if (selectedOption1 == "sc7" && selectedOption2 == "Poor") {
                    return (
                        <>
                        <br/><br/>
                        <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                        Filter By: 
                            <DrawerExample
                            style={{ position: 'absolute', right: 0 }}
                            selectedOption1={this.state.selectedOption1}
                            onOptionChange1={this.handleOptionChange1}
                            selectedOption2={this.state.selectedOption2}
                            onOptionChange2={this.handleOptionChange2}
                            selectedOption3={this.state.selectedOptio3}
                            onOptionChange3={this.handleOptionChange3}
                            selectedOption4={this.state.selectedOption4}
                            onOptionChange4={this.handleOptionChange4}
                    />     
                    </Heading>
        
                    <br/><br/>
                    <Text>There is no Poor Performance Level for any Service Center yet.</Text>
                    <br/><br/>
                    <Text>You have not filled out any Performance Evaluation Form yet, please click the button below to fill in the form.</Text>
                    <br/><br/>
                        <Link to="/Feedback">
                            <Button style={{ backgroundColor: '#1c2c5b', color: 'white' }}>Click Here</Button>
                        </Link>
                        </>
                    )
                } else {
                    return (
                        <>
                        <br/><br/>
                        <Heading as="h3" size="lg" style={{ marginTop: '10px', marginBottom: '20px' }}>
                        Filter By: 
                            <DrawerExample
                            style={{ position: 'absolute', right: 0 }}
                            selectedOption1={this.state.selectedOption1}
                            onOptionChange1={this.handleOptionChange1}
                            selectedOption2={this.state.selectedOption2}
                            onOptionChange2={this.handleOptionChange2}
                            selectedOption3={this.state.selectedOptio3}
                            onOptionChange3={this.handleOptionChange3}
                            selectedOption4={this.state.selectedOption4}
                            onOptionChange4={this.handleOptionChange4}
                    />     
                    </Heading>
        
                    <br/><br/>
                    <Text>There are no records found</Text>

                        </>
                    )
                }
                
            }

        }

      };



    settings ={
        title:"View Performance Evaluation",
        primaryColor: "#a6192e",
        accentColor: "#94795d",
        textColor: "#ffffff",
        textColorInvert: "#606060",
        api: "/api/Feedback/",
    }



    // accordian function
    handleButtonClick(buttonName) {
        this.setState(prevState => ({
          activeButton: prevState.activeButton === buttonName ? null : buttonName
        }));
      }


    async componentDidMount(){
        await this.getContent().then((content)=>{
            console.log(content);
            this.setState({
                content:content,
            });
        })

        await this.getSettings().then((settings)=>{
            console.log(settings);
            this.setState({
                settings:settings,
            });
        })

        this.setState({
            loading:false,
        })
    }

    getSettings = async () => {
        // fetches http://...:5001/api/User/Settings
        return fetch(this.settings.api + "Settings" , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            console.log(res);
            return res.json();
        })
    }

    getContent = async () =>{
        return fetch( this.settings.api + "All" , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            console.log(res);
            //Res = {success: true, message: "Success", data: Array(3)}
            return res.json();
        });
    }

    update = async (data) =>{
        console.log(data);
        return fetch(this.settings.api + "UpdateAndFetch/" + data.FeedbackId , {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(async res => {
            return res.json();
        });
    }

    handleUpdate = async (data) =>{
        await this.update(data).then((content)=>{
            if(content.success){
                this.setState({
                    error:"",
                })
                return true;
            }else{
                this.setState({
                    error:content.message,
                })
                return false;
            }
        })
    }

    requestRefresh = async () =>{
        this.setState({
            loading:true,
        })
        await this.getContent().then((content)=>{
            console.log(content);
            this.setState({
                content:content,
                loading:false,
            });
        })
    }
    
    requestError = async (error) =>{
        this.setState({
            error:error,
        })
    }


    render() {

        const {columnSettings, data, fieldSettings} = this.state
        if (this.state.loading)
        {
            return <loading></loading>
        }
        else
        {
            console.log(data)

            return (

                <ChakraProvider>

            
            {/* <StdButton className={"secondary"}>Filter Option</StdButton> */}

            <div style={{ marginTop: '40px', marginBottom: '30px', width: '94%' }}> 

            

            <br/><br/><br/><br/>
        {this.renderTextbox()}
        <br/><br/><br/><br/>

            </div>
            </ChakraProvider>

                

            )
        }

        
    }


    



}