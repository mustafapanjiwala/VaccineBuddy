import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

import Screen from '../components/Screen';
import CardHeading from '../components/CardHeading';
import img from '../assets/FAQ.png';
import ParaText from '../components/ParaText';
import AppHeading from '../components/AppHeading';

const FaqScreen = () => {
    return (
        <Screen>
            <ScrollView>
                <View style={styles.top}>
                    <CardHeading>FAQs</CardHeading>
                    <Image source={img} style={styles.img} />
                </View>
                <View style={styles.bottom}>
                    <AppHeading style={styles.heading}>
                    What is vaccination?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Vaccination is a simple, safe, and effective way of protecting people against
                    harmful diseases, before they come into contact with them. It uses your
                    body’s natural defenses to build resistance to specific infections and makes
                    your immune system stronger.
                    </ParaText>
                    <AppHeading style={styles.heading}>
                    How does a vaccine work?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Our immune systems are designed to remember. Once exposed to one or
                    more doses of a vaccine, we typically remain protected against a disease
                    for years, decades or even a lifetime. This is what makes vaccines so
                    effective. Rather than treating a disease after it occurs, vaccines prevent us
                    in the first instance from getting sick.
                    </ParaText>
                    <AppHeading style={styles.heading}>
                    Will my child get fever after vaccination?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Not all vaccines cause fever post administration. Only DTP vaccines with
                    whole cell pertussis (mostly DTwP) lead to fever. These are usually the ones given
                    at 6, 10 and 14 weeks; and a booster dose at one and half years.
                    </ParaText>
                    <AppHeading style={styles.heading}>
                    Why should I get vaccinated?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Because without vaccines, we are at risk of serious illness and disability from
                    diseases like measles, meningitis, pneumonia, tetanus and polio. Many of
                    these diseases can be life-threatening. WHO estimates that childhood
                    vaccines alone save over 4 million lives every year.
                    </ParaText>
                    <AppHeading style={styles.heading}>
                    What diseases  do vaccines prevent?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Vaccines protect against many different diseases, including Cervical cancer, Cholera, COVID-19, Diphtheria, Hepatitis B, Influenza, Japanese encephalitis, Measles, Meningitis, Mumps, Pertussis, Pneumonia,  Polio, Rabies, Rotavirus, Rubella, Tetanus, Typhoid, Varicella, Yellow fever.
                    </ParaText>
                    <AppHeading style={styles.heading}>
                    When should I get vaccinated (or vaccinate my child)?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Vaccines protect us throughout life and at different ages, from birth to
                    childhood, as teenagers and into old age. In most countries you will be
                    given a vaccination card that tells you what vaccines you or your child have
                    had and when the next vaccines or booster doses are due. It is important to
                    make sure that all these vaccines are up to date.
                    </ParaText>

                    <AppHeading style={styles.heading}>
                    My child’s vaccination date is on the 15th, can i take the
                    vaccination on the 10th?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    As a rule of thumb, one should not try to prepone vaccination as there has
been a standard gap between two vaccination doses.
                    </ParaText>

                    <AppHeading style={styles.heading}>
                    My vaccination date was yesterday, can I take the vaccine
today?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Yes, vaccination can be delayed by a few days as long as the vaccine is
taken. Although delaying should be avoided all together.
                    </ParaText>

                    <AppHeading style={styles.heading}>
                    Why does vaccination start at such a young age?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Young children can be exposed to diseases in their daily life from many
different places and people, and this can put them at serious risk. The
WHO-recommended vaccination schedule is designed to protect infants
and young children as early as possible. Infants and young children are
often at the greatest risk from diseases because their immune systems are
not yet fully developed, and their bodies are less able to fight off infection. It
is therefore very important that children are vaccinated against diseases at
the recommended time.
                    </ParaText>

                    <AppHeading style={styles.heading}>
                    I didn't vaccinate my child at a young age, is it too late to
catch up?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    For most vaccines, it’s never too late to catch up. Talk to your doctor about
how to get any missed vaccination doses for yourself or your child.
                    </ParaText>

                    <AppHeading style={styles.heading}>
                    Who can get vaccinated?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Nearly everyone can get vaccinated. However, because of some medical
conditions, some people should not get certain vaccines, or should wait
before getting them
                    </ParaText>

                    <AppHeading style={styles.heading}>
                    How are vaccines developed and tested?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    The most commonly used vaccines have been around for decades, with
millions of people receiving them safely every year. As with all medicines,
every vaccine must go through extensive and rigorous testing to ensure it is
safe before it can be introduced in a country.
                    </ParaText>

                    <AppHeading style={styles.heading}>
                    I still have questions about vaccination, what should I do?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    If you have questions about vaccines be sure to talk to your doctor. He or
she can provide you with science-based advice about vaccination for you
and your family, including the recommended vaccination schedule in your
country.When looking online for information about vaccines, be sure to
consult only trustworthy sources.

                    </ParaText>

                    <AppHeading style={styles.heading}>
                    Are vaccines safe?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Vaccination is safe and side effects from a vaccine are usually minor and
temporary, such as a sore arm or mild fever. More serious side effects are
possible, but extremely rare.Any licensed vaccine is rigorously tested
across multiple phases of trials before it is approved for use, and regularly
reassessed once it is introduced. Scientists are also constantly monitoring
information from several sources for any sign that a vaccine may cause
health risks.

                    </ParaText>

                    <AppHeading style={styles.heading}>
                    Are there side effects from vaccines?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Like any medicine, vaccines can cause mild side effects, such as a
low-grade fever, or pain or redness at the injection site. Mild reactions go
away within a few days on their own.Severe or long-lasting side effects are
extremely rare. Vaccines are continually monitored for safety, to detect rare
adverse events.
                    </ParaText>

                    <AppHeading style={styles.heading}>
                    Can a child be given more than one vaccine at a time?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Scientific evidence shows that giving several vaccines at the same time
has no negative effect. Children are exposed to several hundred foreign
substances that trigger an immune response every day. The simple act of
eating food introduces new germs into the body, and numerous bacteria
live in the mouth and nose.

                    </ParaText>

                    <AppHeading style={styles.heading}>
                    Should my child get vaccinated if he/she is sick?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Talk with your child’s doctor, but children can usually get vaccinated even if
they have a mild illness like a cold, earache, mild fever, or diarrhea. If the
doctor says it is okay, your child can still get vaccinated.

                    </ParaText>

                    <AppHeading style={styles.heading}>
                    Which is better, vaccination with fever or vaccination without
fever?

                    </AppHeading>
                    <ParaText style={styles.para}>
                    In India, DTwP is being recommended currently at a mass level (vaccine
with fever), but DTaP is equally effective in providing good immunity at an
individual level.

                    </ParaText>

                    <AppHeading style={styles.heading}>
                    Should I delay some vaccines or follow a non standard
schedule?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Infants and young children who follow immunization schedules that spread
out or leave out shots are at risk of developing diseases during the time
you delay their shots.
                    </ParaText>

                    <AppHeading style={styles.heading}>
                    Why can’t I delay some vaccines if eventually I'm planning to
get them all?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Young children have the highest risk of having a serious case of disease
that could cause hospitalization or death. Delaying or spreading out
vaccine doses leaves your child unprotected during the time when they
need vaccine protection the most
                    </ParaText>

                    <AppHeading style={styles.heading}>
                    If I'm breastfeeding, should I vaccinate my baby on schedule?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Yes, even breastfed babies need to be protected with vaccines at the
recommended ages. The immune system is not fully developed at birth,
which puts newborns at greater risk for infections. Breast milk provides
important protection from some infections as your baby’s immune system is
developing.

                    </ParaText>

                    <AppHeading style={styles.heading}>
                    Can I wait to vaccinate my baby since he isn't in childcare?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    No, even young children who are cared for at home can be exposed to
vaccine preventable diseases, so it’s important for them to get all their
vaccines at the recommended ages. Children can catch these illnesses
from any number of people or places, including from parents, brothers or
sisters, visitors to their home, on playgrounds or even at the grocery store.
                    </ParaText>

                    <AppHeading style={styles.heading}>
                    Why are there so many doses needed for each vaccine?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Getting every recommended dose of each vaccine provides your child with
the best protection possible. Depending on the vaccine, your child will need
more than one dose to build high enough immunity to prevent disease or to
boost immunity that fades over time. Your child may also receive more than
one dose to make sure they are protected if they did not get immunity from
a first dose, or to protect them against germs that change over time, like flu.
Every dose is important because each protects against infectious diseases
that can be especially serious for infants and very young children.

                    </ParaText>

                    <AppHeading style={styles.heading}>
                    What are combination vaccines and why are they used?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Combination vaccines protect your child against more than one disease
with a single shot. They reduce the number of shots and office visits your
child would need, which not only saves you time and money, but also is
easier on your child.
                    </ParaText>

                    <AppHeading style={styles.heading}>
                    Why does my child need a chickenpox vaccine? Isn't it a mild
disease?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    Your child needs a chickenpox vaccine because chickenpox can actually be
a serious disease. In many cases, children experience a mild case of
chickenpox, but other children may have blisters that become infected.
Others may develop pneumonia. There is no way to tell in advance how
severe your child’s symptoms will be.

                    </ParaText>

                    <AppHeading style={styles.heading}>
                    Should my daughter be vaccinated against human
papillomavirus (HPV)?

                    </AppHeading>
                    <ParaText style={styles.para}>
                    Virtually all cervical cancer cases start with a sexually transmitted HPV
infection. If given before exposure to the virus, vaccination offers the best
protection against this disease. Following vaccination, reductions of up to
90% in HPV infections in teenage girls and young womenIn studies, the
HPV vaccine has been shown to be safe and effective. WHO recommends
that all girls aged 9–14 years receive 2 doses of the vaccine, alongside
cervical cancer screening later in life
                    </ParaText>

                    <AppHeading style={styles.heading}>
                    Is there a link between vaccines and autism?
                    </AppHeading>
                    <ParaText style={styles.para}>
                    There is no evidence of any link between vaccines and autism or autistic
disorders. This has been demonstrated in many studies, conducted across
very large populations.
The 1998 study which raised concerns about a possible link between
measles-mumps-rubella (MMR) vaccine and autism was later found to be
seriously flawed and fraudulent.
                    </ParaText>

                </View>
            </ScrollView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30
    },
    top: {
        paddingTop: 60,
        paddingBottom: 10,
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottom: {
        paddingHorizontal: 30
    },
    heading: {
        marginTop: 60,
        marginBottom: 10,
        fontSize: 15
    },
    para: {
        textAlign: 'justify',
        fontSize: 14
    }
});
export default FaqScreen;
