package org.example;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

public class MyServiceTest {
    @Test
    public void testExternalApi(){
        ExternalApi mockApi = Mockito.mock(ExternalApi.class);
        Mockito.when(mockApi.getData()).thenReturn("mock data");

        MyService service = new MyService(mockApi);
        String result = service.fetchData();

        Mockito.verify(mockApi, Mockito.times(1)).getData();
    }
}
