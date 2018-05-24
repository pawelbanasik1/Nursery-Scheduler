#include <stdlib.h>
#include <stdio.h>
 
//TODO Kalendarz
 
class Pielegniarka(){
 
    /* Atrybuty */
 
 
 
 
    /*          NR2         */
    // Zmiany
    bool zmiana_dzien       =   0;  // Zmiana od 8 do 17
    bool zmiana_rano        =   0;  // Zmiana od 7 do 16
    bool zmiana_wieczor     =   0;  // Zmiana od 14 do 23
    bool zmiana_noc         =   0;  // Zmiana od 23 do 7
 
     
    /*          NR3         */
    // Liczba godzin
    int liczba_nadgodzin = 4;
    int liczba_godzin = 0;
 
 
 
    // Liczba nieprzerwanych prac
    int kolejna_zmiana = 0;
    int kolejna_zmiana_nocna = 0;
 
    //Liczba poszczegolnych zmian
    int ilosc_dzien         =   0;
    int ilosc_rano          =   0;
    int ilosc_wieczor       =   0;
    int ilosc_noc           =   0;
    int ilosc_zmian         =   0;
 
 
    // Weekend
    int ilosc_weekendow     =   0;
 
 
    /* Funkcje */
    void stop(int czas);
    void przypisz_zmiane(int zmiana);
 
 
}
 
 
 
 
 
    void Pielegniarka::stop(int czas){
        liczba_godzin =+ czas;
    }
 
 
 
 
    /*              NR10            */
 
    // 1 - dzien
    // 2 - rano
    // 3 - wieczor
    // 4 - noc
    void Pielegniarka::przypisz_zmiane(int zmiana){
        else if(zmiana == 1){
            if(ilosc_zmian >= 5){
                printf("Nie mozna wziac kolejnej zmiany");
                //TODO
            }
            else{
                zmiana_dzien = 1;
                ilosc_dzien++;
                ilosc_zmian++;
            }
        }
 
        else if(zmiana == 2){
            if(ilosc_zmian >= 5){
                printf("Nie mozna wziac kolejnej zmiany");
                //TODO
            }
            zmiana_rano = 1;
            ilosc_rano++;
            ilosc_zmian++;
        }
 
        else if(zmiana == 3){
            if(ilosc_zmian >= 5){
                printf("Nie mozna wziac kolejnej zmiany");
                //TODO
            }
            zmiana_wieczor = 1;
            ilosc_wieczor++;
            ilosc_zmian++;
        }
 
        /*          NR4 + NR9       */
        else if(zmiana == 4){
            if(ilosc_zmian >= 5){
                printf("Nie mozna wziac kolejnej zmiany");
                //TODO
            }
            else{
                if(ilosc_noc == 3){
                    printf("Nie mozna wziac kolejnej nocnej zmiany");
                    //TODO
                }
                else if(kolejna_zmiana_nocna == 3){
                    printf("Nie mozna wziac kolejne nocnej zmiany pod rzad");
                }
                else{
                    zmiana_noc = 1;
                    ilosc_noc++;                
                    ilosc_zmian++;
                }
            }
        }
 
        else{
            printf("Blad! Zla ilosc zmian");
        }
    }
 
 
int main()  {
 
 
 
 
 
 
 
 
}
