The following rules must be met at all times otherwise the schedule is considered
infeasible and unacceptable.
1.
Cover needs to be fulfilled (i.e. no shifts must be left unassigned).
 
2.
For each day a nurse may start only one shift.
 
3
Within a scheduling period a nurse is allowed to exceed the number of hours for which
they are available for their department by at most 4 hours.
 
4.
The maximum number of night shifts is 3 per period of 5 consecutive weeks.
 
5.
A nurse must receive at least 2 weekends off duty per 5 week period. A weekend off duty
lasts 60 hours including Saturday 00:00 to Monday 04:00.
 
6.
Following a series of at least 2 consecutive night shifts a 42 hours rest is required.
 
7.
During any period of 24 consecutive hours, at least 11 hours of rest is required.
 
8.
A night shift has to be followed by at least 14 hours rest. An exception is that once in a
period of 21 days for 24 consecutive hours, the resting time may be reduced to 8 hours.
 
9.
The number of consecutive night shifts is at most 3.
 
10.
The number of consecutive shifts (workdays) is at most 6.
 
Twarde warunki:
1. Wszystkie zmiany zapelnione.
    {
    Przykladowe rozwiazanie:
        Oznaczamy zmiany jako zmienne. Sprawdzamy petla czy logiczne 1 czy 0. 
        Moze to byc tez konkretna liczba np 3 - 3 pielegniarki sa potrzebne. Jesli jest mniej - crash
    }
 
2. Kazda pielegniarka ma miec maksymalnie jedna zmiane
    {
        Przykladowe rozwiazanie:
            Logiczne 1 lub 0 w miejscu atrybutu, inkrementowane za kazdym przypisaniem. Jesli przekroczy 1 - blad
    }
 
3. Maksymalna liczba nadgodzin na dany okres: 4godziny
    {
        Przykladowe rozwiazanie:
            Atrybut liczba_godzin + liczba_nadgodzin
    }
 
4. Maksymalnie 3 zmiany nocne w okresie 5 tygodni
    {
        Przykladowe rozwiazanie:
            Atrybut sprawdzajacy ilosc zmian nocnych dla danej pielegniarki
 
        if( sprawdz_zmiane_nocna(*pielegniarka1)  == 1){
            pielegniarka1 moze wziac zmiane
        }
             
    }
 
5. Conajmniej dwa weekendy wolne na 5 tygodni
    Wolny weekend to 60h od Soboty 00:00 do Poniedzialku 04:00
    {
        Przykladowe rozwiazanie:
            Pielegniarka ma atrybut logiczny 1, 0 - moze isc do pracy, nie moze.
            Funkcja ustawia atrybut na 0 podczas weekendu.
            Funkcja stop(60)
    }
 
6. Jesli zmiana nocna jest dwa dni pod rzad, pielegniarka ma 42h odpoczynku
    {
        Przykladowe rozwiazanie:
            Atrybut zmiana_nocna_kolejnosc++ - if (zmiana_nocna_kolejnosc == 2) Funkcja stop(42);
 
    }
 
7. Po kazdych 24h otrzymuje 11h wolnego
    {
        Przykladowe rozwiazanie:
            Funkcja stop(11);
    }
 
8. Po kazdej zmianie nocnej* odpoczywa 14h. Raz na 21 dni mozna zmniejszyc odpoczynek do 8h
    {
        Przykladowe rozwiazanie:
            Atrybut logiczny mniejszy_odpoczynek. 1 moze "wziac", 0 juz wykorzystane
            Atrybut mniejszy_odpoczynek_kolejny - zawiera date kiedy minie
 
            Funkcja stop(14)
    }
 
9. Maxymalne kolejne zmiany nocne: 3
    {
        kolejne_zmiany_nocne++ - if(kolejne_zmiany_nocne == 3) zmiana_nocna = 0 co oznacza ze pielegniarka nie moze wziac zmiany
    }
 
10 Kolejne zmiany max 6
    {
        kolejna_zmiana++ - if(kolejna_zmiana == 6) odpoczynek() / stop() / weekend()
    }
