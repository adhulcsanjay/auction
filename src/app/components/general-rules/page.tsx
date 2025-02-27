'use client';
import { Container, Stack, Card, CardHeader, Box, TextField, styled, Button, MenuItem, Autocomplete, FormControl } from '@mui/material'
import '../../../public/css/base.css'
import { userData } from '@/app/hooks/use-responsive';;
import React, { useEffect, useState } from 'react';

export default function GeneralRules() {


    return (
        <Container sx={{ px: '0 !important' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            </Stack>
            <div className="grid grid-cols-12 gap-4 pb-15">
                <div className="col-span-12 md:col-span-12">
                    <Card sx={{ boxShadow: 0 }}>
                        <CardHeader title='Additional Rules'
                            titleTypographyProps={{
                                fontSize: 16,
                                fontFamily: 'inherit',
                                fontWeight: 500,
                                className: 'card-title'
                            }} />
                        <Box sx={{ mx: 3 }}>
                            <div className="grid">
                                <ul className="rule-ul">
                                    <li>An artist is limited to register for only five solo events.</li>
                                    <li>No restriction for group items.</li>
                                    <li>In main stage group events such as the Fashion Show and Freestyle, each company is limited to participating with only three teams per event.</li>
                                    <li>No Negative marking for Non Participation</li>
                                    <li>All participating companies will get points for the rally, based on the theme and participation count</li>
                                </ul>
                            </div>
                        </Box>

                    </Card>

                </div>
            </div>

            <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                    <Card sx={{ boxShadow: 0 }}>
                        <CardHeader title='Event Prizes'
                            titleTypographyProps={{
                                fontSize: 16,
                                fontFamily: 'inherit',
                                fontWeight: 500,
                                className: 'card-title'
                            }} />
                        <Box sx={{ mx: 3 }}>
                            <div className="grid">
                                <ul className="rule-ul">
                                    <li>First position</li>
                                    <li>Second position</li>

                                </ul>
                            </div>
                        </Box>

                    </Card>

                </div>
                <div>
                    <Card sx={{ boxShadow: 0 }}>
                        <CardHeader title='Point System (Solo)'
                            titleTypographyProps={{
                                fontSize: 16,
                                fontFamily: 'inherit',
                                fontWeight: 500,
                                className: 'card-title'
                            }} />
                        <Box sx={{ mx: 3 }}>
                            <div className="grid">
                                <ul className="rule-ul">
                                    <li>First - 15 points</li>
                                    <li>Second - 10 points</li>

                                </ul>
                            </div>
                        </Box>

                    </Card>

                </div>
                <div>
                    <Card sx={{ boxShadow: 0 }}>
                        <CardHeader title='Point System (Group)'
                            titleTypographyProps={{
                                fontSize: 16,
                                fontFamily: 'inherit',
                                fontWeight: 500,
                                className: 'card-title'
                            }} />
                        <Box sx={{ mx: 3 }}>
                            <div className="grid">
                                <ul className="rule-ul">
                                    <li>First - 30 points</li>
                                    <li>Second - 20 points</li>
                                </ul>
                            </div>
                        </Box>

                    </Card>

                </div>
            </div>
            <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-3 gap-4 pt-15">
                <div>
                    <Card sx={{ boxShadow: 0 }}>
                        <CardHeader title='Overall Awards'
                            titleTypographyProps={{
                                fontSize: 16,
                                fontFamily: 'inherit',
                                fontWeight: 500,
                                className: 'card-title'
                            }} />
                        <Box sx={{ mx: 3 }}>
                            <div className="grid">
                                <ul className="rule-ul">
                                    <li>The Champions of Tarang</li>
                                    <li>1st Runner-up</li>
                                    <li>2nd Runner-up</li>
                                </ul>
                            </div>
                        </Box>

                    </Card>
                </div>
                <div>
                    <Card sx={{ boxShadow: 0 }}>
                        <CardHeader title='Registration Fee'
                            titleTypographyProps={{
                                fontSize: 16,
                                fontFamily: 'inherit',
                                fontWeight: 500,
                                className: 'card-title'
                            }} />
                        <Box sx={{ mx: 3 }}>
                            <div className="grid">
                                <ul className="rule-ul">
                                    <li>Single <span style={{ fontFamily: 'sans-serif' }}>₹</span>100</li>
                                    <li>Group <span style={{ fontFamily: 'sans-serif' }}>₹</span>250</li>
                                    <li>Mega stage <span style={{ fontFamily: 'sans-serif' }}>₹</span>950</li>
                                </ul>
                            </div>
                        </Box>

                    </Card>

                </div>
                <div>
                    <Card sx={{ boxShadow: 0 }}>
                        <CardHeader title='Rally'
                            titleTypographyProps={{
                                fontSize: 16,
                                fontFamily: 'inherit',
                                fontWeight: 500,
                                className: 'card-title'
                            }} />
                        <Box sx={{ mx: 3 }}>
                            <div className="grid">
                                <ul className="rule-ul">
                                    <li>First - 50 points</li>
                                    <li>Second - 40 points</li>
                                    <li>Third - 30 points</li>
                                </ul>
                            </div>
                        </Box>

                    </Card>

                </div>

            </div>
            <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-2 gap-4 pt-15">
                <div>
                    <Card sx={{ boxShadow: 0 }}>
                        <CardHeader title='Awards'
                            titleTypographyProps={{
                                fontSize: 16,
                                fontFamily: 'inherit',
                                fontWeight: 500,
                                className: 'card-title'
                            }} />
                        <Box sx={{ mx: 3 }}>
                            <div className="grid">
                                <ul className="rule-ul">
                                    <li>Kalaprathibha - Best Male Artist</li>
                                    <li>Kalathilakam - Best Female Artist</li>
                                    <li>Voice Of Tarang -  Best Singer</li>

                                    <li>Versatile Dancer  - Best Dancer</li>
                                    <li>Spirit Of Tarang - Real spirit Of Tarang</li>
                                    <li>Best Actor of Tarang</li>
                                    <li>Best Writer of Tarang</li>
                                    <li>Best Artist of Tarang</li>
                                    <li>Excellence in Participation - Company with the maximum number of participation</li>

                                </ul>
                            </div>
                        </Box>

                    </Card>

                </div>
                <div>
                    <Card sx={{ boxShadow: 0 }}>
                        <CardHeader title='Payment Information'
                            titleTypographyProps={{
                                fontSize: 16,
                                fontFamily: 'inherit',
                                fontWeight: 500,
                                className: 'card-title'
                            }} />
                        <Box sx={{ mx: 3 }}>
                            <div className="grid">
                                <ul className="rule-ul">
                                    <li>Kindly submit the registration fee through Google Pay to the specified number <b>9961471077</b> or UPI ID <b>krishnavinodc-1@oksbi</b>. After making the payment, please share the transaction details, along with your registration number, via WhatsApp to the same number. The registration approval process commences only upon successful payment; until then, your registration status will be in pending.</li>
                                </ul>
                            </div>
                        </Box>

                    </Card>
                </div>

            </div>

            {/* <Toast 
            open={toastOpen}
            message={toastConfig.message}
            onClose={handleCloseToast}
            severity={toastConfig.severity}/> */}

        </Container>
    )
}
